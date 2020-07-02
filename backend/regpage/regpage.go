package regpage

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type Registration struct {
	Username string
	Password string
}

type RegResponse struct {
	RegisterSuccess bool
	UsernameExist   bool
}

type Handlers struct {
	logger *log.Logger
	db     *sqlx.DB
}

//USERNAME:PASSWORD@/DBNAME
var (
	//MySQLconfig = os.Getenv("MYSQLCONFIG")
	MySQLconfig = "japari:password@tcp(mysqldatabase)/japari"
)

func (h *Handlers) Logger(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		startTime := time.Now()
		h.logger.Printf("request processed in %s\n", time.Now().Sub(startTime))
		next(w, r)
	}
}

// post_json_data:
// {
// 	username: 'username', longer than 6
// 	password: 'password'  longer than 6 and contain 1 special character
// }

func (h *Handlers) GetUsernamePassword(w http.ResponseWriter, r *http.Request) (string, string) {
	var t Registration

	//log.Println(r)
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	if len(t.Username) == 0 || len(t.Password) == 0 {
		log.Printf("Check the datafield in request, can't parse username or password.")
	}

	log.Println(t.Username)
	log.Println(t.Password)
	return t.Username, t.Password
}

func (h *Handlers) CheckUsernameExsit(Username string) bool {
	log.Print(MySQLconfig)
	db, err := sqlx.Connect("mysql", MySQLconfig)
	if err != nil {
		log.Fatalln(err)
	}

	var userCount int

	db.Get(&userCount, "SELECT COUNT(1) FROM users WHERE username = ?", Username)

	if userCount == 1 {
		return true
	}
	return false
}

func (h *Handlers) UpdateDatabase(Username, Password string) {
	db, err := sqlx.Connect("mysql", MySQLconfig)
	if err != nil {
		log.Fatal(err)
	}

	db.Exec("INSERT INTO users (username, password) VALUES (?, ?)", Username, Password)

}

func (h *Handlers) HandleRegister(w http.ResponseWriter, r *http.Request) {
	//log.Print(r)
	header := w.Header()
	header.Add("Access-Control-Allow-Origin", "*")
	header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	Username, Password := h.GetUsernamePassword(w, r)
	if h.CheckUsernameExsit(Username) {
		respone := RegResponse{false, true}
		regresponse, err := json.Marshal(respone)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		w.Write(regresponse)
	} else {
		h.UpdateDatabase(Username, Password)
		response := RegResponse{true, false}
		regresponse, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		w.Write(regresponse)
	}
}

func (h *Handlers) SetupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/register", h.Logger(h.HandleRegister))
}

func NewHandlers(logger *log.Logger) *Handlers {
	return &Handlers{
		logger: logger,
	}
}
