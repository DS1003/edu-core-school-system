import { redirect } from 'next/navigation';

export default function TimetableRedirect() {
  redirect('/dashboard/schedule');
}
