var input = document.getElementById("input");
var button = document.getElementById("button");
var answer = document.getElementById("answer");
var list = document.getElementById("list");
var i = 0;

button.addEventListener("click", sprawdz);            // nasłuchiwanie na kliknięcie

var losuj = Math.floor(Math.random() * 10) + 1;         // stworzenie losowania zmiennej 

function sprawdz() {                                    //funkcja sprawdzająca czy wylosowana liczba jest taka jak podana
    var odpowiedz = Number(input.value);                //number - zmienia na liczbe
    answer.innerHTML = odpowiedz;                   //pobranie wartości wpisanej w pole input i umieszczenie go w answer

    if (Number.isInteger(odpowiedz) && odpowiedz >= 1 && odpowiedz <= 10) {
        i++;

        var li = document.createElement("li");
        list.appendChild(li);
        list.lastChild.innerHTML = "Odpowiedź " + i.toString() + ": " + odpowiedz;


        if (odpowiedz < losuj) {
            answer.innerHTML = "Liczba wylosowana jest WIĘKSZA od podanej";
        }
        else if (odpowiedz > losuj) {
            answer.innerHTML = "Liczba wylosowana jest MNIEJSZA od podanej";
        }
        else {
            answer.classList.add("good");
            answer.innerHTML = "Brawo zgadłeś za " + i + " razem !";
            button.innerHTML = "Odśwież";
            button.addEventListener("click", Odśwież);
        }
    }
    else {
        alert("Błąd")
    }

}
console.log(losuj);

function Odśwież() {
    location.reload();
}