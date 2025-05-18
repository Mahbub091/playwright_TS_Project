import { Page } from "playwright";

export class loginPage {
  readonly email: string;
  readonly password: string;
  readonly eyeIcon: string;
  readonly loginButton: string;
  readonly toastMessage: string;
  readonly successfulLoginMessage: string;
  readonly emailInputBoxHeader: string;
  readonly passwordInputBoxHeader: string;
  readonly emailInputBoxErrorMessage: string;
  readonly passwordInputBoxErrorMessage: string;
  readonly loginPageRegisterButton: string;
  readonly loginPageHeaderText: string;
  readonly forgetPasswordButton: string;
  readonly forgetPasswordFormHeaderText: string;
  readonly ForgetPasswordEmailHeader: string;
  readonly ForgetPasswordEmailInputBox: string;
  readonly forgetPasswordFormSubHeaderText: string;

  constructor(page: Page) {
    this.loginPageHeaderText =
      "css=div[class='flex flex-col space-y-1.5 p-6'] div:nth-child(2)";
    this.email = `css=input[type='email']`;
    this.password = `css=input[name='password']`;
    this.eyeIcon = `css=button[class='inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-9 rounded-md px-3 ml-auto hover:bg-transparent']`;
    this.loginButton = `css=button[type='submit']`;
    this.toastMessage = `css=div[class='grid gap-1']`;
    this.emailInputBoxHeader = `xpath=//label[normalize-space()='Email Address']`;
    this.passwordInputBoxHeader = `xpath=//label[normalize-space()='Password']`;
    this.emailInputBoxErrorMessage = `xpath=(//p[@id=':re:-form-item-message'])[1]`;
    this.passwordInputBoxErrorMessage = `xpath= //p[@id=':rf:-form-item-message']`;
    this.loginPageRegisterButton = `css=div[class='text-sm text-muted-foreground m-auto'] a[href='/register']`;
    this.forgetPasswordButton = `css=a[href='/forgot-password']`;
    this.forgetPasswordFormHeaderText = `css=div[class='flex flex-col space-y-1.5 p-6'] div:nth-child(2)`;
    this.forgetPasswordFormSubHeaderText = `css=div[class='flex flex-col space-y-1.5 p-6'] div:nth-child(3)`;
    this.ForgetPasswordEmailHeader = `css=div[class="space-y-2"] label`;
    this.ForgetPasswordEmailInputBox = `css=input[id=':ru:-form-item']`;
  }
}
