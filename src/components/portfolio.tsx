'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, Moon, Sun, Menu, X, Palette, Globe, Code, Zap, ExternalLink, ArrowRight, Dribbble, DiscIcon as Discord, DribbbleIcon as Behance } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function PortfolioComponent() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      <main className="pt-16">
        <Hero />
        <Journey />
        <WhatIDo />
        <Projects />
        <TechStack />
      </main>
      <Footer />
    </div>
  )
}

function Header({ darkMode, toggleDarkMode, mobileMenuOpen, toggleMobileMenu }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <Logo />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 dark:from-green-300 dark:to-green-500">
              thegr8binil
            </h1>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <Button variant="outline" size="sm" className="text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900">
              Contact Me
            </Button>
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </nav>

          <div className="flex items-center md:hidden">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="ml-2">
              <Menu className="h-6 w-6 text-green-600 dark:text-green-400" />
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} toggleMenu={toggleMobileMenu} />
    </motion.header>
  )
}

function Logo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="url(#paint0_linear)" />
      <path d="M20 10L28.6603 25H11.3397L20 10Z" fill="white" />
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ADE80" />
          <stop offset="1" stopColor="#22C55E" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function NavLinks() {
  const links = ['Home', 'Projects', 'About', 'Contact']
  return (
    <>
      {links.map((link, index) => (
        <NavLink key={link} href={`#${link.toLowerCase()}`} index={index}>
          {link}
        </NavLink>
      ))}
    </>
  )
}

function NavLink({ href, children, index }) {
  return (
    <motion.a
      href={href}
      className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {children}
    </motion.a>
  )
}

function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-5 w-5 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-5 w-5 text-gray-600" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function MobileMenu({ isOpen, toggleMenu }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <NavLinks />
              <Button className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700">
                Contact Me
              </Button>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center">
        {/* <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          src="/placeholder.svg"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-green-400 dark:border-green-500"
        /> */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-4"
        >
          Hello, I'm Binil
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl font-bold mb-6"
        >
          <GradientText>DIGITAL EXPERIENCE</GradientText><br />
          <GradientText>DESIGNER & DEVELOPER</GradientText>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl mb-8"
        >
          Based in Kerala, India
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-400"
        >
          I create digital experiences that border on efficiency, aesthetics, and functionality.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button size="lg" className="bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700">
            Let's Connect
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function Journey() {
  const workExperience = [
    {
      company: "In Time Tec",
      role: "Senior Software Engineer",
      period: "Apr 2023 - Jul 2023",
      logo: "/placeholder.svg"
    },
    {
      company: "Maximl Labs",
      role: "Senior Software Developer",
      period: "Oct 2021 - Jul 2022",
      logo: "/placeholder.svg"
    },
    {
      company: "Oracle Solution Services(India)",
      role: "Staff Consultant",
      period: "Aug 2018 - Jul 2021",
      logo: "/placeholder.svg"
    },
    {
      company: "ASM Enterprise Solutions",
      role: "Associate Consultant",
      period: "Oct 2017 - Aug 2018",
      logo: "/placeholder.svg"
    }
  ]

  const education = [
    {
      institution: "University of Technology",
      degree: "Master of Computer Science",
      period: "2015 - 2017",
      logo: "/placeholder.svg"
    },
    {
      institution: "State University",
      degree: "Bachelor of Engineering",
      period: "2011 - 2015",
      logo: "/placeholder.svg"
    }
  ]

  const skills = [
    "JavaScript",
    "TypeScript",
    "Python",
    "ReactJS",
    "NextJS",
    "Postgres",
    "Tensorflow",
    "Numpy",
    "SQL"
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 dark:from-green-300 dark:to-green-500">
                Get to the fun side
              </span>
            </h2>
          </div>

          <Tabs defaultValue="work" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            
            <TabsContent value="work" className="mt-0">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
                {workExperience.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 mb-8 relative"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-gray-700 border-4 border-gray-100 dark:border-gray-600 flex items-center justify-center">
                        <img
                          src={item.logo}
                          alt={item.company}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>
                    <Card className="flex-1 p-6">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {item.period}
                      </div>
                      <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-1">
                        {item.company}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.role}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-0">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
                {education.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 mb-8 relative"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-gray-700 border-4 border-gray-100 dark:border-gray-600 flex items-center justify-center">
                        <img
                          src={item.logo}
                          alt={item.institution}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>
                    <Card className="flex-1 p-6">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {item.period}
                      </div>
                      <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-1">
                        {item.institution}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.degree}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 dark:from-green-300 dark:to-green-500">
                Skills
              </span>
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function WhatIDo() {
  const items = [
    {
      title: "UI & UX Design",
      icon: <Palette className="w-10 h-10 text-green-500" />,
      description: "Crafting intuitive and visually appealing interfaces that enhance user experience and engagement. Specializing in user-centered design principles and creating seamless interactions."
    },
    {
      title: "Web & Mobile Development",
      icon: <Globe className="w-10 h-10 text-green-500" />,
      description: "Building responsive and performant web and mobile applications using cutting-edge technologies. Expertise in creating cross-platform solutions that work flawlessly on all devices."
    },
    {
      title: "Full-Stack Development",
      icon: <Code className="w-10 h-10 text-green-500" />,
      description: "Developing end-to-end solutions from database design to front-end implementation. Proficient in various programming languages and frameworks to create robust and scalable applications."
    },
    {
      title: "Performance Optimization",
      icon: <Zap className="w-10 h-10 text-green-500" />,
      description: "Enhancing application speed and efficiency through advanced optimization techniques. Implementing best practices for faster load times and smoother user experiences."
    }
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="what-i-do" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          <GradientText>WHAT I DO</GradientText>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-white dark:bg-gray-800 h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <div className="mb-4">{item.icon}</div>
                  <CardTitle className="text-xl font-bold text-green-600 dark:text-green-400">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const featuredProject = {
    title: "Formy-AI",
    description: "AI-driven form builder SaaS app deployed with Vercel. Utilized Next.js, Drizzle ORM with Neon PostgreSQL for data, Tailwind CSS, and Shadcn UI for design. Integrated Clerk for authentication and Stripe for payments.",
    technologies: ["Next.js", "PostgreSQL", "Clerk", "Gemini API", "Tailwind CSS", "Shadcn UI", "Stripe"],
    image: "/placeholder.svg",
    link: "#"
  }

  const projects = [
    
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with product management, user authentication, and payment integration. Built with Node.js and React.",
      technologies: ["Node.js", "Express", "React", "MongoDB", "Stripe"],
      image: "/placeholder.svg",
      link: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, user roles, and project analytics. Implemented using the MERN stack.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
      image: "/placeholder.svg",
      link: "#"
    }
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          <GradientText>MY PROJECTS</GradientText>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-white dark:bg-gray-900 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img src={featuredProject.image} alt={featuredProject.title} className="w-full h-64 md:h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">{featuredProject.title}</CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300 mb-4">{featuredProject.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">{tech}</Badge>
                  ))}
                </div>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  View Project <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
            >
              <Card className="bg-white dark:bg-gray-900 h-full flex flex-col">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-green-600 dark:text-green-400">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
            View All Projects <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function TechStack() {
  const techStack = [
    "react", "nextjs", "typescript", "nodejs", "python",
    "tailwind", "postgresql", "mongodb", "aws", "docker"
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="tech-stack" className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          <GradientText>MY TECH STACK</GradientText>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-400"
        >
          My expertise spans a diverse range of <span className="text-green-500 dark:text-green-300">technologies</span>, enabling me to deliver
          comprehensive and <span className="text-green-700 dark:text-green-200">cutting-edge solutions</span> across various platforms.
        </motion.p>
        <div className="flex flex-wrap justify-center gap-8">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg"
            >
              <img src={`/tech/${tech}.svg`} alt={tech} className="w-10 h-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const exploreLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Me', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  const socialLinks = [
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: '#' },
    { name: 'Behance', icon: <Behance className="w-5 h-5" />, href: '#' },
    { name: 'Dribbble', icon: <Dribbble className="w-5 h-5" />, href: '#' },
    { name: 'Discord', icon: <Discord className="w-5 h-5" />, href: '#' },
    { name: 'Github', icon: <Github className="w-5 h-5" />, href: '#' }
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-800/50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">
              Where <span className="text-purple-500 dark:text-purple-400">aesthetics</span> &{' '}
              <span className="text-cyan-500 dark:text-cyan-400">functionality</span> meet
            </h3>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-orange-500 dark:text-orange-400 mb-4">Explore</h4>
            <nav className="flex flex-col space-y-3">
              {exploreLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-cyan-500 dark:text-cyan-400 mb-4">Follow Me</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Button
              variant="ghost"
              className="group text-lg hover:bg-green-50 dark:hover:bg-green-950"
              asChild
            >
              <a href="#contact">
                Contact Me
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Separator orientation="vertical" className="hidden md:block h-6" />
            <Button
              variant="ghost"
              className="group text-lg hover:bg-green-50 dark:hover:bg-green-950"
              asChild
            >
              <a href="#projects">
                My Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>thegr8binil ©2024</span>
            <Separator orientation="vertical" className="hidden md:block h-4" />
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <Separator orientation="vertical" className="hidden md:block h-4" />
            <span>Kerala, India</span>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-6xl font-bold text-gray-200 dark:text-gray-700/50 text-center font-serif">
            thegr8binil
          </h2>
        </div>
      </div>
    </footer>
  )
}

function GradientText({ children }) {
  return (
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 dark:from-green-300 dark:to-green-500">
      {children}
    </span>
  )
}