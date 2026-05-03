package main

import (
	"log"

	"coffeeface/cmd/app"
	"coffeeface/cmd/config"
)

func main() {
	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatalf("Config error: %s", err)
	}

	err = app.Run(cfg)
	if err != nil {
		log.Fatalf("Run error: %s", err)
	}
}
