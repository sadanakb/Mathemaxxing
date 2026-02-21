import { redirect } from 'next/navigation';

// Root redirects to onboarding for new users (client handles existing users → dashboard)
export default function Home() {
  redirect('/onboarding');
}
