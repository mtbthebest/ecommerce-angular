export class AuthUser {
  authenticate(email: string, password: string) {

    if (email == 'webdec010119@gmail.com' && password == 'password') {
      return true;
    } else {
      return false;
    }
  }

}
