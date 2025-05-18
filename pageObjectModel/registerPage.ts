import { Page } from "playwright";

export class registerPage {
  readonly heroText: string;
  readonly heroText2: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly password: string;
  readonly eyeIcon: string;
  readonly confirmPassword: string;
  readonly privacyPolicyText: string;
  readonly privacyPolicyCheckbox: string;
  readonly submitButton: string;
  readonly toastMessage: string;
  readonly firstNameHeader: string;
  readonly firstNameErrorMessage: string;
  readonly lastNameHeader: string;
  readonly lastNameErrorMessage: string;
  readonly emailInputBoxHeader: string;
  readonly phoneNumberHeader: string;
  readonly passwordInputBoxHeader: string;
  readonly confirmPasswordHeader: string;
  readonly emailInputBoxErrorMessage: string;
  readonly phoneNumberInputBoxErrorMessage: string;
  readonly passwordInputBoxErrorMessage: string;
  readonly confirmPasswordInputBoxErrorMessage: string;

  constructor(page: Page) {
    this.heroText = `xpath=//div[normalize-space()='To register, please fill in the form below.']`;
    this.heroText2 = `css=div[class='flex flex-col space-y-1.5 p-6'] div:nth-child(3)`;
    this.firstNameHeader = `css=label[for=':re:-form-item']`;
    this.firstName = `css=input[id=':re:-form-item']`;
    this.firstNameErrorMessage = `css=p[id=':re:-form-item-message']`;
    this.lastNameHeader = `css=label[for=':rf:-form-item']`;
    this.lastName = `css=input[id=':rf:-form-item']`;
    this.lastNameErrorMessage = `css=p[id=':rf:-form-item-message']`;
    this.emailInputBoxHeader = `css=label[for=':rg:-form-item']`;
    this.email = `css=input[id=':rg:-form-item']`;
    this.emailInputBoxErrorMessage = `css=p[id=':rg:-form-item-message']`;
    this.phoneNumberHeader = `css=label[for=':rh:-form-item']`;
    this.phoneNumber = `css=input[id=':rh:-form-item']`;
    this.phoneNumberInputBoxErrorMessage = `css=p[id=':rh:-form-item-message']`;
    this.passwordInputBoxHeader = `css=label[for=':r1g:-form-item']`;
    this.password = `css=input[id=':ri:-form-item']`;
    this.passwordInputBoxErrorMessage = `css=p[id=':r1g:-form-item-message']`;
    this.confirmPasswordHeader = `css=label[for=':rj:-form-item']`;
    this.confirmPassword = `css=input[id=':rj:-form-item']`;
    this.confirmPasswordInputBoxErrorMessage = `css=p[id=':rj:-form-item-message']`;
    this.privacyPolicyText = `css=div[class='flex items-center space-x-2']`;
    this.privacyPolicyCheckbox = `css=div[class='flex items-center space-x-2'] button[role='checkbox']`;
    this.submitButton = `css=button[type='submit']`;
    this.toastMessage = `css=div[class='grid gap-1']`;
  }
}
