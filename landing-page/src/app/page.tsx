'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Github, Linkedin, Twitter, HardDrive, Briefcase, Users, Calendar, Code, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from 'next/image'
import { Link as ScrollLink } from "react-scroll"

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  
  return (
    <div className="min-h-screen bg-background text-foreground font-dm-sans">
      {/* Header */}
      <header
        className={`fixed w-full bg-opacity-94 bg-white dark:bg-slate-950 z-50 border-b ${darkMode ? 'bg-black/95' : 'bg-background/95'}`}
      >
        <div className="container flex items-center justify-between h-16 px-4">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/assets/agencycentral.svg"
              alt="AgencyCentral logo"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              AgencyCentral.
            </span>
          </a>

          <div className="lg:hidden flex items-center space-x-2">
            {/* Dark mode toggle for mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-slate-700 dark:text-slate-50"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Burger Icon for Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-slate-700 dark:text-slate-50"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Nav for larger screens */}
          <nav className="hidden lg:flex items-center space-x-4">
            <ScrollLink to="features" smooth={true} duration={500} offset={-80} className="cursor-pointer">
              <motion.div className="text-slate-700 dark:text-slate-50 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">
                Features
              </motion.div>
            </ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500} offset={-80} className="cursor-pointer">
              <motion.div className="text-slate-700 dark:text-slate-50 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">
                About
              </motion.div>
            </ScrollLink>
            <ScrollLink to="timeline" smooth={true} duration={500} offset={-80} className="cursor-pointer">
              <motion.div className="text-slate-700 dark:text-slate-50 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">
                Timeline
              </motion.div>
            </ScrollLink>
            <ScrollLink to="stack" smooth={true} duration={500} offset={-80} className="cursor-pointer">
              <motion.div className="text-slate-700 dark:text-slate-50 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">
                Tech Stack
              </motion.div>
            </ScrollLink>
            <Button
              variant="outline"
              size="sm"
              className="text-white dark:text-gray-100 hover:text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all duration-300 border-none"
            >
              <div className="cursor-pointer">
                Launch App
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-slate-700 dark:text-slate-50"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden bg-white dark:bg-slate-950">
            <ul className="space-y-4 p-4">
              <li>
                <ScrollLink
                  to="features"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={toggleMobileMenu}
                  className="block text-slate-700 dark:text-slate-50 hover:text-blue-500 dark:hover:text-blue-500"
                >
                  Features
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={toggleMobileMenu}
                  className="block text-slate-700 dark:text-slate-50 hover:text-blue-500 dark:hover:text-blue-500"
                >
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="timeline"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={toggleMobileMenu}
                  className="block text-slate-700 dark:text-slate-50 hover:text-blue-500 dark:hover:text-blue-500"
                >
                  Timeline
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="stack"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={toggleMobileMenu}
                  className="block text-slate-700 dark:text-slate-50 hover:text-blue-500 dark:hover:text-blue-500"
                >
                  Tech Stack
                </ScrollLink>
              </li>
              <li>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all duration-300 text-white dark:text-gray-100 hover:text-white border-none"
                >
                  <div className="cursor-pointer">
                    Launch App
                  </div>
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </header>


      <main>
        <section className="h-screen flex items-center justify-center bg-[url('/assets/banner-image.jpeg')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-black/50 dark:bg-black/75"></div>
                <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="relative text-center text-white"
                >
                
    
            <div className="bg-gradient-to-l from-blue-50 to-blue-100 dark:from-blue-500 dark:to-blue-600 text-transparent bg-clip-text relative drop-shadow-2xl">
                  <h1 className="text-7xl overflow- leading-tight font-bold text-center md:text-[12.5rem] pr-4 pl-4" >
                    Agency
                  </h1>
                </div>
            <div className="bg-gradient-to-r  from-blue-50 to-blue-200 dark:from-blue-500 dark:to-blue-600 text-transparent bg-clip-text relative drop-shadow-2xl">
                  <h1 className="text-7xl font-bold text-center md:text-[12.5rem] pr-4 pl-4">
                    Central
                  </h1>
                </div>
                    <p className="text-xl mb-8 text-gray-200 dark:text-gray-100">Centralize Your Workflow<br></br> Amplify Your Growth</p>
                <Button size="lg" className="text-white dark:text-gray-100 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all duration-300" asChild>
                        <a href="#">Launch App</a>
                    </Button>
                </motion.div>
        </section>
     
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">AgencyCentral Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Media Storage", 
                  description: "Securely store and manage your media files. Our robust media storage solution ensures your assets are always accessible and protected.", 
                  icon: HardDrive,
                  image: "/assets/media-storage.jpeg?height=200&width=400"
                },
                { 
                  title: "Project Management", 
                  description: "Streamline your workflow with our comprehensive project management system. Keep track of tasks, deadlines, and team collaboration all in one place.", 
                  icon: Briefcase,
                    image: "/assets/project-management.jpeg?height=200&width=400"
                },
                { 
                  title: "Role-based Access", 
                  description: "Ensure security and efficiency with customizable role-based access control. Define user permissions and protect sensitive information with ease.", 
                  icon: Users,
                  image: "/assets/role-based-access.jpeg?height=200&width=400"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <Image 
                          src={feature.image} 
                          alt={feature.title} 
                          width={400}
                          height={200}
                          style={{ objectFit: 'cover' }} // Use style instead of objectFit prop
                        />
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-3 rounded-full mr-4">
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-blue-900">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">About AgencyCentral</h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="mb-4 text-gray-600 dark:text-gray-100" >
                AgencyCentral was born out of the need for a comprehensive solution to manage complex agency workflows. As a developer and aspiring agency owner, I realized the challenges of juggling multiple clients, projects, and financial transactions.
              </p>
                          <p className="mb-8 text-gray-600 dark:text-gray-200">
                This project aims to streamline these processes, allowing agencies to focus on what they do best - delivering value to their clients. This is a Portfolio Project for <a title="Holberton" href="https://www.holbertonschool.com/">Holberton School</a> , showcasing the culmination of my software engineering skills and my vision for the future of agency management tools.
              </p>
              <div className="flex justify-center space-x-4">
                {[
                  { href: "https://linkedin.com/in/kgothatsontsane", icon: Linkedin },
                  { href: "https://github.com/kgothatsontsane", icon: Github },
                  { href: "https://x.com/kgothatsontsane", icon: Twitter }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button variant="outline" size="icon" className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white border-none">
                      <social.icon className="h-5 w-5" />
                    </Button>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="timeline" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Project Timeline</h2>
            <div className="max-w-3xl mx-auto">
              <div className="relative border-l-4 border-blue-500 ml-3">
                <div className="mb-10 ml-6">
                    <div className="flex items-center justify-center mb-2">
                    <div className="absolute -left-3 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                        <h3 className="text-slate-950 dark:text-slate-100 text-xl font-semibold ml-4">Week 1-2: Development Phase</h3>
                  </div>
                  <p className="flex items-center j text-gray-600 dark:text-gray-300">
                    Intensive coding and feature implementation. This phase focused on building the core functionalities of AgencyCentral, including the media storage system, project management tools, and role-based access controls.
                  </p>
                </div>
                <div className="mb-10 ml-6">
                                  <div className="flex items-center justify-center mb-2">
                    <div className="absolute -left-3 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-slate-950 dark:text-slate-100 text-xl font-semibold ml-4">Week 3: Final Touch-ups</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Refinement and polishing of the application. This week was dedicated to improving user experience, fixing bugs, optimizing performance, and ensuring the application was ready for deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="stack" className="py-20 bg-white dark:bg-gray-800">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Tech Stack</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Next.js 14", description: "React framework for server-side rendering and static site generation" },
                { name: "Bun", description: "JavaScript runtime for improved performance" },
                { name: "Stripe Connect", description: "Payment platform for managing payments and payouts" },
                { name: "Prisma", description: "Next-generation ORM for Node.js and TypeScript" },
                { name: "MySQL", description: "Open-source relational database management system" },
                { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development" }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-2">
                        <Code className="h-6 w-6 mr-2 text-blue-500" />
                        <h3 className="text-lg font-semibold">{tech.name}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{tech.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-blue-400 to-blue-600 py-6 text-white">
        <div className="container text-center">
          <p>&copy; 2023 AgencyCentral. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}