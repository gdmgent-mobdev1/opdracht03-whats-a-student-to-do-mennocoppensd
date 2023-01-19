/* eslint-disable no-console */
export default class Exception extends Error {
  // eslint-disable-next-line class-methods-use-this
  showError(errorMessage: string) {
    const errorContainer: HTMLElement | null = document.querySelector('.errorContainer');
    if (errorContainer) {
      errorContainer.innerHTML = errorMessage;
      errorContainer.classList.remove('hide');
    }
  }

  //  Check which error is thrown
  TypeError() {
    switch (this.message) {
      case 'FirebaseError: Firebase: Error (auth/invalid-email).':
        console.log('Invalid email');
        break;
      case 'FirebaseError: Firebase: Error (auth/user-not-found).':
        console.log('No account found with that email address');
        break;
      case 'FirebaseError: Firebase: Error (auth/internal-error).':
        console.log('Invalid email or password');
        break;
      case 'FirebaseError: Firebase: Error (auth/wrong-password).':
        console.log('Invalid email or password');
        break;
      case 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).':
        console.log('Password must be at least 6 characters long');
        break;
      case 'FirebaseError: Firebase: Error (auth/email-already-in-use).':
        console.log('An account already exists with this email address');
        break;
      case 'Vul alle velden in':
        console.log('Please fill in all fields');
        break;
      default:
        console.log('Something went wrong');
        break;
    }
  }
}
