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
