export class User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: Date;
  street?: string;
  zipCode?: number;
  city?: string;
  
  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    // Handle Firebase Timestamp or regular date
    if (obj && obj.birthDate) {
      if (obj.birthDate.toDate) {
        // Firebase Timestamp
        this.birthDate = obj.birthDate.toDate();
      } else if (obj.birthDate.seconds) {
        // Firebase Timestamp as object
        this.birthDate = new Date(obj.birthDate.seconds * 1000);
      } else {
        // Regular date string/object
        this.birthDate = new Date(obj.birthDate);
      }
    } else {
      this.birthDate = undefined;
    }
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
    };
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}