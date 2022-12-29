/**
 * An Exception Object
 */

export default class Exception extends Error {
  showError(errorMessage) {
    const errorContainer = document.querySelector('.errorContainer');
    errorContainer.innerHTML = errorMessage;
    errorContainer.classList.remove('hide');
  }

  //  Sees what errormessage it has to show
  checkWichError() {
    switch (this.message) {
      case 'FirebaseError: Firebase: Error (auth/invalid-email).':
        console.log('Ongeldige email');
        break;
      case 'FirebaseError: Firebase: Error (auth/user-not-found).':
        console.log('Er is geen account met dat emailadres');
        break;
      case 'FirebaseError: Firebase: Error (auth/internal-error).':
        console.log('Ongeldige email of wachtwoord');
        break;
      case 'FirebaseError: Firebase: Error (auth/wrong-password).':
        console.log('Ongeldige email of wachtwoord');
        break;
      case 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).':
        console.log('Het wachtwoord moet minstens 6 tekens lang zijn');
        break;
      case 'FirebaseError: Firebase: Error (auth/email-already-in-use).':
        console.log('Er bestaat al een account met dit emailadres');
        break;
      case 'Vul alle velden in':
        console.log('Vul alle velden in');
        break;
      case 'Einddatum mag niet voor de startdatum liggen':
        console.log('Einddatum mag niet voor de startdatum liggen');
        break;
      case 'Voor dezelfde datum mag eindtijd niet voor de starttijd liggen':
        console.log('Voor dezelfde datum mag eindtijd niet voor de starttijd liggen');
        break;
      default:
        console.log('Er is iets foutgelopen');
        break;
    }
  }
}
