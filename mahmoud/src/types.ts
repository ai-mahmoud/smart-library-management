export type Screen = 'home' | 'librarian-login' | 'member-login' | 'librarian-dashboard' | 'member-dashboard';

export type Book = {
  id: number;
  title: string;
  author: string;
  available: boolean;
};

export type Member = {
  id: number;
  name: string;
  password: string;
  fines: number;
};

export type Loan = {
  id: number;
  bookId: number;
  memberId: number;
  date: string;
};
