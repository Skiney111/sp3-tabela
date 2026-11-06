import React, { useState } from 'react';

function App() {
  const pracownicy = [
    { id: 1, imie: "Anna", nazwisko: "Kowalska", dzial: "IT", pensja: 7200 },
    { id: 2, imie: "Piotr", nazwisko: "Nowak", dzial: "Sprzedaż", pensja: 5400 },
    { id: 3, imie: "Maria", nazwisko: "Wiśniewska", dzial: "Księgowość", pensja: 6100 },
    { id: 4, imie: "Jan", nazwisko: "Kowalczyk", dzial: "IT", pensja: 8300 },
    { id: 5, imie: "Katarzyna", nazwisko: "Zielińska", dzial: "Sprzedaż", pensja: 5900 },
    { id: 6, imie: "Tomasz", nazwisko: "Szymański", dzial: "IT", pensja: 9100 },
    { id: 7, imie: "Agnieszka", nazwisko: "Woźniak", dzial: "Księgowość", pensja: 6400 },
    { id: 8, imie: "Michał", nazwisko: "Kaczmarek", dzial: "Sprzedaż", pensja: 5200 },
    { id: 9, imie: "Magdalena", nazwisko: "Mazur", dzial: "IT", pensja: 7800 },
    { id: 10, imie: "Paweł", nazwisko: "Krawczyk", dzial: "Księgowość", pensja: 6000 },
    { id: 11, imie: "Joanna", nazwisko: "Piotrowska", dzial: "Sprzedaż", pensja: 5600 },
    { id: 12, imie: "Łukasz", nazwisko: "Grabowski", dzial: "IT", pensja: 8700 }
  ];

  const [szukajTekst, setSzukajTekst] = useState("");
  const [wybranyDzial, setWybranyDzial] = useState("");
  const [wyniki, setWyniki] = useState(pracownicy);

  function filtrujPracownikow(nowyTekst, nowyDzial) {
    let znormalizowanyTekst = nowyTekst.trim().toLowerCase();
    let przefiltrowani = [];

    for (let i = 0; i < pracownicy.length; i++) {
      let pracownik = pracownicy[i];
      let nazwiskoMale = pracownik.nazwisko.toLowerCase();
      let pasujeNazwisko = nazwiskoMale.includes(znormalizowanyTekst);
      let pasujeDzial = false;

      if (nowyDzial === "" || pracownik.dzial === nowyDzial) {
        pasujeDzial = true;
      }

      if (pasujeNazwisko && pasujeDzial) {
        przefiltrowani.push(pracownik);
      }
    }
    setWyniki(przefiltrowani);
  }

  function obsluzZmianeSzukaj(event) {
    let wartosc = event.target.value;
    setSzukajTekst(wartosc);
    filtrujPracownikow(wartosc, wybranyDzial);
  }

  function obsluzZmianeDzialu(event) {
    let wartosc = event.target.value;
    setWybranyDzial(wartosc);
    filtrujPracownikow(szukajTekst, wartosc);
  }

  return (
    <div className="container mt-5 main-card">
      <h2 className="mb-4 dashboard-title">Panel Pracowników</h2>
      
      <div className="row g-3 mb-4 filter-section">
        <div className="col-md-6">
          <label htmlFor="poleSzukaj" className="form-label fw-semibold">Szukaj po nazwisku:</label>
          <input 
            type="text" 
            id="poleSzukaj" 
            className="form-control custom-input" 
            placeholder="Wpisz nazwisko..."
            value={szukajTekst} 
            onChange={obsluzZmianeSzukaj} 
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="listaDzial" className="form-label fw-semibold">Filtruj dział:</label>
          <select 
            id="listaDzial" 
            className="form-select custom-select" 
            value={wybranyDzial} 
            onChange={obsluzZmianeDzialu} 
          >
            <option value="">Wszystkie działy</option>
            <option value="IT">IT</option>
            <option value="Sprzedaż">Sprzedaż</option>
            <option value="Księgowość">Księgowość</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0 text-muted">
          Znaleziono: <span className="badge bg-primary fs-6">{wyniki.length}</span>
        </p>
      </div>

      {wyniki.length > 0 ? (
        <div className="table-responsive rounded-3 shadow-sm">
          <table className="table table-hover align-middle mb-0 custom-table">
            <thead>
              <tr>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Dział</th>
                <th className="text-end">Pensja</th>
              </tr>
            </thead>
            <tbody>
              {wyniki.map(function (pracownik) {
                return (
                  <tr key={pracownik.id}>
                    <td className="fw-medium">{pracownik.imie}</td>
                    <td className="fw-medium">{pracownik.nazwisko}</td>
                    <td>
                      <span className={`badge dzial-badge ${pracownik.dzial.toLowerCase()}`}>
                        {pracownik.dzial}
                      </span>
                    </td>
                    <td className="text-end fw-bold text-secondary">
                      {pracownik.pensja.toLocaleString('pl-PL')} zł
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-custom text-center py-4" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Brak pracowników spełniających wybrane kryteria wyszukiwania.
        </div>
      )}
    </div>
  );
}

export default App;
