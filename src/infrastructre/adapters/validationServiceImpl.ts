import { ValidationService } from "../../application/ports/validationService";
import { User } from "../../domain/user";

export class ValidationServiceImpl implements ValidationService {
    validateUser(user: User): void {
        const { fullName, dateOfBirth, isActive, contacts } = user;

        if (!fullName || typeof fullName !== "string" || fullName.trim().length === 0) {
            throw new Error("Full name is required and must be a non-empty string.");
        }

        if (!dateOfBirth || isNaN(Date.parse(dateOfBirth))) {
            throw new Error("Date of birth is required and must be a valid date.");
        }

        if (typeof isActive !== "boolean") {
            throw new Error("The 'isActive' field must be a boolean.");
        }

        if (!Array.isArray(contacts) || contacts.length === 0) {
            throw new Error("At least one contact is required.");
        }

        const primaryContacts = contacts.filter(contact => contact.isPrimary);

        if (primaryContacts.length !== 1) {
            throw new Error("There must be exactly one primary contact.");
        }

        for (const contact of contacts) {
            if (!contact.email || !this.isValidEmail(contact.email)) {
                throw new Error(`Invalid email: ${contact.email}`);
            }

            if (!contact.phone || typeof contact.phone !== "string") {
                throw new Error("Each contact must have a valid phone number.");
            }
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
