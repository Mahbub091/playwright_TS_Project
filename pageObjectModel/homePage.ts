import { Page } from "playwright";

export class homePage {
  readonly homePageCanvas: string;
  readonly loginButton: string;
  readonly registerButton: string;
  readonly headerImage: string;
  readonly homePageHeroText: string;
  readonly homePageSubHeroText: string;
  readonly startTrialButton: string;
  readonly viewPricingButton: string;
  readonly pricingSectionHeroText: string;
  readonly pricingSectionSubHeroText: string;
  readonly researcherBlockHeader: string;
  readonly administratorBlockHeader: string;
  readonly researcherPriceText: string;
  readonly pricingSectionLinkTexts: string;
  readonly getStartedButton: string;
  readonly contactSalesButton: string;
  readonly footerBlock: string;

  constructor(page: Page) {
    this.homePageCanvas = `css=canvas[width='1472']`;
    this.loginButton = `css=a[data-intro="navbar-notification"][data-discover="true"][href="/login"]`;
    this.registerButton = `css=a[data-intro="navbar-notification"][href="/register"][data-discover="true"]`;
    this.headerImage = `css=div[class='flex items-center gap-4'] img[alt='FundFit Logo']`;
    this.homePageHeroText = `css=h1[class='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 break-normal']`;
    this.homePageSubHeroText = `css=p[class='text-lg md:text-xl text-gray-600 leading-relaxed break-normal']`;
    this.startTrialButton = `css=div[class='flex flex-col sm:flex-row gap-4']> a:nth-child(1)`;
    this.viewPricingButton = `css=div[class='flex flex-col sm:flex-row gap-4']> button`;
    this.researcherPriceText = `css=span[class='text-3xl font-bold text-orange-600']`;
    this.pricingSectionHeroText = `css=h2[class='text-3xl md:text-4xl font-bold text-gray-900 mb-4']`;
    this.pricingSectionSubHeroText = `css=.text-xl.text-gray-600`;
    this.footerBlock = `css=footer[class='text-center py-4'] span:nth-child(1)`;
    this.researcherBlockHeader = `css=div[class='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'] div:nth-child(1) div:nth-child(1) h4:nth-child(1)`;
    this.administratorBlockHeader = `css=div[class='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'] div:nth-child(2) div:nth-child(1) h4:nth-child(1)`;
    this.pricingSectionLinkTexts = `css=ul[class='space-y-3 mb-8'] li[class='flex items-start text-sm text-gray-600']`;
    this.getStartedButton = `css=a[class='block'] button[class='inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 w-full bg-primary text-white font-bold hover:bg-orange-600']`;
    this.contactSalesButton = `css=a[href='https://streamlyne.com/fundfit/']`;
  }
}
