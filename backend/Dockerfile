FROM golang:1.14

#WORKDIR /go/src/app

COPY . .
RUN go get "github.com/go-sql-driver/mysql"
RUN go get "github.com/jmoiron/sqlx"

EXPOSE 8080

CMD ["go", "run", "main.go"]