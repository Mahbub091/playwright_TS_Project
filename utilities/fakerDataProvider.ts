import { faker } from "@faker-js/faker";

export class FakerDataProvider {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  bio: string;
  randomCharValue30Digits: string;
  randomCharValuesForInputValueValidation: string;
  numericValueOf20Digits: string;
  backgroundType: (typeof backgroundTypes)[number];
  role: string;
  department: string;
  organization: string;
  organizationAddress: string;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };

  workType: (typeof workTypes)[number];
  journalTitle: string;
  title: string;
  publicationYear: number;
  publicationMonth: number;
  publicationDay: number;

  projectTypes: (typeof projectTypes)[number];
  projectTitle: string;
  organizationType: string
  amount: string;

  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email();
    this.phoneNumber = faker.string.numeric(10);
    this.password = faker.internet.password();
    this.bio = faker.lorem.paragraphs(2);
    this.randomCharValue30Digits = faker.string.alphanumeric(30);
    this.randomCharValuesForInputValueValidation =
      faker.string.alphanumeric(70);
    this.numericValueOf20Digits = faker.string.numeric(20);

    this.backgroundType = faker.helpers.arrayElement(backgroundTypes);
    this.role = faker.person.jobTitle();
    this.department = faker.commerce.department();
    this.organization = faker.company.name();
    this.organizationAddress = faker.location.streetAddress();

    const start = faker.date.past({ years: 10 });
    const end = faker.date.recent({ days: 30 });

    this.startDate = {
      year: start.getFullYear(),
      month: start.getMonth() + 1,
      day: start.getDate(),
    };

    this.endDate = {
      year: end.getFullYear(),
      month: end.getMonth() + 1,
      day: end.getDate(),
    };

    this.workType = faker.helpers.arrayElement(workTypes);
    this.journalTitle = faker.company.name() + " Journal";
    this.title = faker.lorem.sentence();

    const publicationDate = faker.date.past({ years: 5 });
    this.publicationYear = publicationDate.getFullYear();
    this.publicationMonth = publicationDate.getMonth() + 1;
    this.publicationDay = publicationDate.getDate();

    this.projectTypes = faker.helpers.arrayElement(projectTypes);
    this.projectTitle= faker.company.catchPhrase();
    this.organizationType=faker.company.buzzVerb();
    this.amount = faker.string.numeric({ length: 5, allowLeadingZeros: false });
  }
}

const backgroundTypes = [
  "Distinction",
  "Education",
  "Employment",
  "Invited Position",
  "Membership",
  "Qualification",
  "Service",
] as const;

const workTypes = [
  "Annotation",
  "Artistic Performance",
  "Conference Abstract",
  "Conference Paper",
  "Conference Poster",
  "Data Management Plan",
  "Data Set",
  "Dictionary Entry",
  "Disclosure",
  "Dissertation/Thesis",
  "Edited Book",
  "Encyclopedia Entry",
  "Invention",
  "Book",
  "Book Chapter",
  "Book Review",
  "Edited Book",
  "Encyclopedia Entry",
  "Invention",
  "Journal Article",
  "Journal Issue",
  "Lecture/Speech",
  "License",
  "Magazine Article",
  "Manual",
  "Newsletter Article",
  "Newspaper Article",
  "Online Resource",
  "Other",
  "Patent",
  "Physical Object",
  "Preprint",
  "Registered Copyright",
  "Report",
  "Research Technique",
  "Research Tool",
  "Review",
  "Software",
  "Spin-off Company",
  "Standards and Policy",
  "Supervised Student Publication",
  "Technical Standard",
  "Test",
  "Trademark",
  "Translation",
  "Website",
  "Working Paper",
] as const;

const projectTypes = ["Contract", "Salary Award", "Grant", "Award"] as const;
