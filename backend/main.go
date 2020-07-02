package main

import (
	"log"
	"net/http"
	"os"

	"./loginpage"
	"./regpage"
	"./server"
)

func main() {
	logger := log.New(os.Stdout, "kemetrics ", log.LstdFlags|log.LstdFlags)

	LoginHandler := regpage.NewHandlers(logger)
	RegisterHandler := loginpage.NewHandlers(logger)

	mux := http.NewServeMux()
	LoginHandler.SetupRoutes(mux)
	RegisterHandler.SetupRoutes(mux)

	srv := server.New(mux)

	logger.Println("Starting Server")
	err := srv.ListenAndServe()
	if err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
