import Navbar from 'Components/Navbar.jsx';
import Hero from 'Components/Hero.jsx';
import ProjectsSection from 'Components/ProjectsSection.jsx';
import ResumeSection from 'Components/ResumeSection.jsx';
import ContactSection from 'Components/ ContactSection.jsx';


export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero />
      <ProjectsSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
