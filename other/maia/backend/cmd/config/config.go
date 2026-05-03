package config

import (
	"gopkg.in/yaml.v3"
	"log"
	"os"
)

const configPath = "./cmd/config/config.yaml"

type Config struct {
	App           AppConfig           `yaml:"app"`
	Logger        LoggerConfig        `yaml:"logger"`
	Server        ServerConfig        `yaml:"server"`
	Database      DatabaseConfig      `yaml:"database"`
	ObjectStorage ObjectStorageConfig `yaml:"object_storage"`
	Model         ModelConfig         `yaml:"model"`
}

type AppConfig struct {
	Name    string `yaml:"name"`
	Version string `yaml:"version"`
}

type LoggerConfig struct {
	Level string `yaml:"log_level"`
}

type ServerConfig struct {
	Host string `yaml:"host"`
	Port uint16 `yaml:"port"`
}

type DatabaseConfig struct {
	Host     string `yaml:"host"`
	Port     uint16 `yaml:"port"`
	Name     string `yaml:"name"`
	User     string `yaml:"user"`
	Password string `yaml:"password"`
}

type ObjectStorageConfig struct {
	Bucket string `yaml:"bucket"`
}

type ModelConfig struct {
	Host string `yaml:"host"`
	Port int    `yaml:"port"`
}

func NewConfig() (*Config, error) {
	var config Config

	configFile, err := os.ReadFile(configPath)
	if err != nil {
		return nil, err
	}
	err = yaml.Unmarshal(configFile, &config)
	if err != nil {
		log.Fatalf("Unmarshal: %v", err)
	}

	return &config, nil
}
