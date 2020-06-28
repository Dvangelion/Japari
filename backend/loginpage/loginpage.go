package loginpage

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type Login struct {
	Username string
	Password string
}

type LoginResponse struct {
	LoginSuccess  bool
	UsernameExist bool
}

type Handlers struct {
	logger *log.Logger
	db     *sqlx.DB
}

//USERNAME:PASSWORD@/DBNAME
var (
	MySQLconfig = os.Getenv("MYSQLCONFIG")
)

func (h *Handlers) Logger(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		startTime := time.Now()
		h.logger.Printf("request processed in %s\n", time.Now().Sub(startTime))
		next(w, r)
	}
}

func (h *Handlers) GetUsernamePassword(w http.ResponseWriter, r *http.Request) (string, string) {
	var t Login

	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	if len(t.Username) == 0 || len(t.Password) == 0 {
		log.Printf("Check the datafield in request, can't parse username or password.")
	}

	log.Println(t.Username)
	log.Println(t.Password)
	// log.Println(reflect.TypeOf(t.Password).String())
	return t.Username, t.Password
}

func (h *Handlers) CheckUsernameExsit(Username string) bool {
	//TODO: Change password field to os.getenv
	db, err := sqlx.Connect("mysql", MySQLconfig)
	if err != nil {
		log.Fatalln(err)
	}

	var userCount int
	//query := strings.Join([]string{"SELECT COUNT(1) FROM users WHERE username = ", "'", Username, "'"}, "")
	//db.Select(&esult, "SELECT COUNT(1) FROM users WHERE username =$1", Username)
	//db.Get(&result, "SELECT COUNT(1) FROM users WHERE username = ?", Username)

	db.Get(&userCount, "SELECT COUNT(1) FROM users WHERE username = ?", Username)

	// if err != nil {
	// 	log.Printf("Get username failed")
	// }

	if userCount == 1 {
		return true
	}
	return false
}

func (h *Handlers) AuthenticationSuccess(Username, Password string) bool {

	db, err := sqlx.Connect("mysql", MySQLconfig)
	if err != nil {
		log.Fatal(err)
	}

	var GTPassword string

	db.Get(&GTPassword, "SELECT password from users where username = ?", Username)

	if GTPassword == Password {
		return true
	}

	return false
}

func (h *Handlers) HandleLogin(w http.ResponseWriter, r *http.Request) {
	header := w.Header()
	header.Add("Access-Control-Allow-Origin", "http://localhost:3000")
	header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
	header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)

	Username, Password := h.GetUsernamePassword(w, r)
	if h.CheckUsernameExsit(Username) {
		if h.AuthenticationSuccess(Username, Password) {
			response := LoginResponse{true, true}
			loginresponse, err := json.Marshal(response)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			//w.WriteHeader(http.StatusOK)
			w.Write(loginresponse)
			//w.Write([]byte("Login Success, welcome"))
		} else {
			response := LoginResponse{false, true}
			loginresponse, err := json.Marshal(response)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "application/json; charset=utf-8")
			//w.WriteHeader(http.StatusOK)
			w.Write(loginresponse)
			//w.Write([]byte("Password incorrect, login failed"))
		}
	} else {
		response := LoginResponse{false, false}
		loginresponse, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		//w.WriteHeader(http.StatusOK)
		w.Write(loginresponse)
		//w.Write([]byte("User does not exist"))
	}
}

func (h *Handlers) SetupRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/login", h.Logger(h.HandleLogin))
}

func NewHandlers(logger *log.Logger) *Handlers {
	return &Handlers{
		logger: logger,
	}
}
