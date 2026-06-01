import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = '/api/contact'; // Replace with actual endpoint

  constructor(private http: HttpClient) { }

  /**
   * Submit a contact form
   * @param formData - Contact form data
   * @returns Observable of contact response
   */
  submitContactForm(formData: ContactFormData): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, formData);
  }

  /**
   * Validate email format
   * @param email - Email address to validate
   * @returns true if valid email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate required fields
   * @param formData - Form data to validate
   * @returns Error message or empty string if valid
   */
  validateForm(formData: ContactFormData): string {
    if (!formData.name || formData.name.trim().length === 0) {
      return 'Name is required';
    }
    if (!formData.email || formData.email.trim().length === 0) {
      return 'Email is required';
    }
    if (!this.isValidEmail(formData.email)) {
      return 'Please enter a valid email address';
    }
    if (!formData.message || formData.message.trim().length === 0) {
      return 'Message is required';
    }
    if (formData.message.trim().length < 10) {
      return 'Message should be at least 10 characters long';
    }
    return '';
  }

  /**
   * Get contact information
   * @returns Contact details object
   */
  getContactInfo() {
    return {
      email: 'nashetajohn@gmail.com',
      telegram: '@salvagejohn',
      whatsapp: '+254 112 157 383',
      linkedin: 'nashetajohnigaming',
    };
  }

  /**
   * Create mailto link
   * @param email - Recipient email
   * @param subject - Email subject
   * @param body - Email body
   * @returns mailto URL
   */
  createMailtoLink(
    email: string = 'nashetajohn@gmail.com',
    subject: string = 'iGamingUbuntu Inquiry',
    body: string = ''
  ): string {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  }

  /**
   * Subscribe to newsletter
   * @param email - Email address to subscribe
   * @returns Observable of subscription response
   */
  subscribeNewsletter(email: string): Observable<ContactResponse> {
    return this.http.post<ContactResponse>('/api/subscribe', { email });
  }
}
