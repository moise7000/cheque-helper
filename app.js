function convertir() {
  const montant = parseFloat(document.getElementById('montant').value);
  if (isNaN(montant) || montant < 0 || montant > 999999999999.99) {
    document.getElementById('resultat').textContent = "Veuillez entrer un montant valide entre 0 et 999 999 999 999,99 €";
    return;
  }

  const euros = Math.floor(montant);
  const centimes = Math.round((montant - euros) * 100);

  let resultat = nombreEnLettres(euros) + " euros";
  if (centimes > 0) {
    resultat += " et " + nombreEnLettres(centimes) + " centimes";
  }

  document.getElementById('resultat').textContent = resultat;
  mettreAJourCheque(montant, resultat);
}



// ... (fonctions précédentes inchangées) ...

function mettreAJourCheque(montant, montantEnLettres) {
  const date = new Date().toLocaleDateString('fr-FR');
  document.querySelector('.montant-chiffres').textContent = montant.toFixed(2) + ' €';
  document.querySelector('.montant-lettres').textContent = montantEnLettres;
  document.querySelector('.date').textContent = date;

  // Ajustement du trait de sécurité
  document.querySelector('.montant-lettres').textContent = montantEnLettres;
  ajusterTraitSecurite();
}

function ajusterTraitSecurite() {
  console.log("Ajustement du trait de sécurité");
  const chequePreview = document.querySelector('.cheque-preview');
  const montantLettresElement = document.querySelector('.montant-lettres');
  let traitSecurite = document.querySelector('.trait-securite');

  if (!traitSecurite) {
    traitSecurite = document.createElement('div');
    traitSecurite.className = 'trait-securite';
    chequePreview.appendChild(traitSecurite);
  }

  // Calculer la largeur du texte du montant en lettres
  const textWidth = montantLettresElement.offsetWidth;

  // Calculer la position de début du trait (juste après le texte)
  const traitLeft = 30 + textWidth + 5; // 5px d'espace après le texte

  // Calculer la largeur disponible pour le trait
  const chequeWidth = chequePreview.offsetWidth;
  const traitWidth = chequeWidth - traitLeft - 140; // 140px pour le montant en chiffres

  // Appliquer les styles calculés
  traitSecurite.style.left = `${traitLeft}px`;
  traitSecurite.style.width = `${traitWidth}px`;
  traitSecurite.style.display = 'block';
}



function nombreEnLettres(nombre) {
  const unites = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
  const dizaines = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"];

  if (nombre === 0) return "zéro";

  function traduire(n) {
    if (n < 20) return unites[n];
    if (n < 100) {
      let dizaine = Math.floor(n / 10);
      let unite = n % 10;
      if (dizaine === 7 || dizaine === 9) {
        return dizaines[dizaine - 1] + "-" + (unite === 1 ? "et-" : "") + unites[10 + unite];
      } else {
        let resultat = dizaines[dizaine];
        if (unite === 1 && dizaine !== 8) resultat += " et";
        else if (unite !== 0) resultat += "-";
        return resultat + (unite !== 0 ? unites[unite] : "");
      }
    }
    if (n < 1000) {
      let centaine = Math.floor(n / 100);
      let reste = n % 100;
      let resultat = (centaine > 1 ? unites[centaine] + " " : "") + "cent";
      if (centaine > 1 && reste === 0) resultat += "s";
      if (reste !== 0) resultat += " " + traduire(reste);
      return resultat;
    }
    if (n < 1000000) return traduire(Math.floor(n / 1000)) + " mille" + (n % 1000 !== 0 ? " " + traduire(n % 1000) : "");
    if (n < 1000000000) return traduire(Math.floor(n / 1000000)) + " million" + (Math.floor(n / 1000000) > 1 ? "s" : "") + (n % 1000000 !== 0 ? " " + traduire(n % 1000000) : "");
    return traduire(Math.floor(n / 1000000000)) + " milliard" + (Math.floor(n / 1000000000) > 1 ? "s" : "") + (n % 1000000000 !== 0 ? " " + traduire(n % 1000000000) : "");
  }

  return traduire(nombre);
}
