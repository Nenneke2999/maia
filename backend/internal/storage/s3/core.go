package s3

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/url"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	awsconfig "github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"

	"coffeeface/cmd/config"
	"coffeeface/internal/storage"
)

type ObjectStorage struct {
	bucket string
	client *s3.Client
}

func NewObjectStorage(ctx context.Context, cfg config.ObjectStorageConfig) (*ObjectStorage, error) {
	customResolver := aws.EndpointResolverWithOptionsFunc(func(service, region string, options ...interface{}) (aws.Endpoint, error) {
		if service == s3.ServiceID && region == "ru-central1" {
			return aws.Endpoint{
				PartitionID:   "yc",
				URL:           "https://storage.yandexcloud.net",
				SigningRegion: "ru-central1",
			}, nil
		}
		return aws.Endpoint{}, fmt.Errorf("unknown endpoint requested")
	})

	s3Cfg, err := awsconfig.LoadDefaultConfig(ctx, awsconfig.WithEndpointResolverWithOptions(customResolver))
	if err != nil {
		return nil, fmt.Errorf("load default s3 config: %w", err)
	}

	return &ObjectStorage{
		bucket: cfg.Bucket,
		client: s3.NewFromConfig(s3Cfg),
	}, nil
}

func (s *ObjectStorage) SavePrompt(ctx context.Context, request *storage.SavePromptRequest) error {
	_, err := s.client.PutObject(ctx, &s3.PutObjectInput{
		Bucket: aws.String(s.bucket),
		Key:    aws.String(request.SessionID + "/" + request.CreatedAt + ".json"),
		Body:   bytes.NewReader(request.Body),
	})
	if err != nil {
		return fmt.Errorf("put object: %w", err)
	}

	return nil
}

func (s *ObjectStorage) GetPrompts(ctx context.Context, s3URLs []string) ([]byte, error) {
	if len(s3URLs) < 1 {
		return []byte{}, nil
	}

	prompts := []byte{'['}

	for _, s3URL := range s3URLs {
		bucket, key, err := parseS3URL(s3URL)
		if err != nil {
			return nil, fmt.Errorf("parse s3 url: %w", err)
		}

		prompt, err := s.client.GetObject(ctx, &s3.GetObjectInput{
			Bucket: aws.String(bucket),
			Key:    aws.String(key),
		})
		if err != nil {
			return nil, fmt.Errorf("get object from s3: %w", err)
		}

		promptBody, err := readPromptBody(prompt.Body)
		if err != nil {
			return nil, fmt.Errorf("read prompt body: %w", err)
		}

		prompts = append(prompts, promptBody...)
	}
	prompts = bytes.TrimSuffix(prompts, []byte{','})

	return append(prompts, ']'), nil
}

func (s *ObjectStorage) GetBucket() string {
	return s.bucket
}

func parseS3URL(s3URL string) (string, string, error) {
	p, err := url.Parse(s3URL)
	if err != nil {
		return "", "", err
	}

	return p.Host, strings.Trim(p.Path, "/"), nil
}

func readPromptBody(prompt io.ReadCloser) ([]byte, error) {
	promptBody, err := io.ReadAll(prompt)
	if err != nil {
		return nil, err
	}

	return append(promptBody, ','), nil
}
