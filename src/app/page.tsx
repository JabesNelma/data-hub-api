'use client';

import Link from 'next/link';
import { Book, Database, Lock, Code2, Zap, Globe } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion } from 'framer-motion';

export default function Home() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex flex-col bg-background"
    >
      {/* Header */}
      <motion.header
        variants={fadeInDown}
        className="border-b bg-card"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center"
            >
              <Database className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold">Data Hub API</h1>
              <p className="text-xs text-muted-foreground">Generic Open Data Backend</p>
            </div>
          </motion.div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 items-center">
              {['Overview', 'Endpoints', 'Authentication'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        variants={fadeInUp}
        className="container mx-auto px-4 py-20 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            variants={scaleIn}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            A Generic Open Data Backend
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground mb-8"
          >
            Store, serve, and manage any type of data with flexible JSON structures,
            JWT authentication, and a RESTful API design.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#getting-started"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium inline-block"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#endpoints"
                className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors font-medium inline-block"
              >
                View API Docs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={fadeInUp}
        className="container mx-auto px-4 py-16"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: Database, title: "Flexible Data Storage", desc: "Store any type of data using JSON-based structures with categories and types" },
            { icon: Lock, title: "JWT Authentication", desc: "Secure API with access and refresh tokens, role-based access control" },
            { icon: Zap, title: "RESTful API", desc: "Clean, intuitive endpoints following REST principles with consistent responses" },
            { icon: Globe, title: "Public Read Access", desc: "Data is publicly accessible, perfect for open data projects and APIs" },
            { icon: Code2, title: "Developer Friendly", desc: "Clear documentation, example requests, and consistent response formats" },
            { icon: Book, title: "Production Ready", desc: "Open-source, MIT licensed, deployment-ready configuration" },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                whileTap={{ scale: 0.98 }}
                className="p-6 border rounded-lg bg-card hover:border-primary/50 transition-colors cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 * index }}
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Overview Section */}
      <motion.section
        id="overview"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 py-16 bg-accent/50 -mx-4 px-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Overview
          </motion.h3>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-muted-foreground leading-relaxed">
                Data Hub API is a generic open data backend designed to store and serve
                ANY type of data using categories and flexible JSON structures. The API
                is designed to be consumed by web apps, mobile apps, dashboards, and
                external services.
              </p>
              <h4 className="text-xl font-semibold mt-6 mb-3">Core Concepts</h4>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Categories:</strong> Organize data into logical groups (e.g., General, Documentation, API)</li>
                <li><strong className="text-foreground">Data Types:</strong> Classify data by format (e.g., JSON, Text, Structured)</li>
                <li><strong className="text-foreground">Data Entries:</strong> Store flexible JSON content with metadata</li>
                <li><strong className="text-foreground">Role-Based Access:</strong> Admins can manage data, public users can only read</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Authentication Section */}
      <motion.section
        id="authentication"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Authentication
          </motion.h3>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-muted-foreground leading-relaxed">
                The Data Hub API uses JWT (JSON Web Tokens) for authentication. Public
                endpoints (GET requests) do not require authentication. Write operations
                (POST, PUT, DELETE) require an access token with admin role.
              </p>

              <motion.h4
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xl font-semibold mt-6 mb-3"
              >
                Token Types
              </motion.h4>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-4 mt-4"
              >
                <motion.div
                  whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
                  className="p-4 border rounded-lg bg-card"
                >
                  <h5 className="font-semibold mb-2">Access Token</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Expires in 15 minutes</li>
                    <li>• Used for API requests</li>
                    <li>• Include in Authorization header</li>
                  </ul>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
                  className="p-4 border rounded-lg bg-card"
                >
                  <h5 className="font-semibold mb-2">Refresh Token</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Expires in 7 days</li>
                    <li>• Used to get new access tokens</li>
                    <li>• More secure, long-lived</li>
                  </ul>
                </motion.div>
              </motion.div>

              <motion.h4
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xl font-semibold mt-8 mb-3"
              >
                Authentication Flow
              </motion.h4>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                {[
                  "Send POST request to /api/auth/login with username and password",
                  "Receive access token and refresh token in response",
                  "Include access token in Authorization header: Bearer {token}",
                  "When access token expires, use refresh token to get a new one",
                  "Include new access token in subsequent requests",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Endpoints Section */}
      <motion.section
        id="endpoints"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 py-16 bg-accent/50 -mx-4 px-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            API Endpoints
          </motion.h3>

          {/* Authentication Endpoints */}
          <div className="mb-12">
            <motion.h4
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl font-semibold mb-4 flex items-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Authentication
            </motion.h4>
            <div className="space-y-3">
              <EndpointCard
                method="POST"
                path="/api/auth/login"
                description="Authenticate with username and password"
                public={false}
              />
              <EndpointCard
                method="POST"
                path="/api/auth/refresh"
                description="Refresh access token using refresh token"
                public={false}
              />
              <EndpointCard
                method="POST"
                path="/api/auth/logout"
                description="Logout current session"
                public={false}
              />
            </div>
          </div>

          {/* Data Endpoints */}
          <div className="mb-12">
            <motion.h4
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl font-semibold mb-4 flex items-center gap-2"
            >
              <Database className="w-5 h-5" />
              Data Management
            </motion.h4>
            <div className="space-y-3">
              <EndpointCard
                method="GET"
                path="/api/data"
                description="Get all data entries (public read access)"
                public={true}
                params="Optional: categoryId, typeId (query params)"
              />
              <EndpointCard
                method="GET"
                path="/api/data/:id"
                description="Get data entry by ID (public read access)"
                public={true}
              />
              <EndpointCard
                method="POST"
                path="/api/data"
                description="Create new data entry (admin only)"
                public={false}
                body="Required: categoryId, typeId, title, content"
              />
              <EndpointCard
                method="PUT"
                path="/api/data/:id"
                description="Update data entry (admin only)"
                public={false}
                body="Optional: categoryId, typeId, title, content, source"
              />
              <EndpointCard
                method="DELETE"
                path="/api/data/:id"
                description="Delete data entry (admin only)"
                public={false}
              />
            </div>
          </div>

          {/* Categories & Types */}
          <div className="mb-12">
            <motion.h4
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl font-semibold mb-4 flex items-center gap-2"
            >
              <Code2 className="w-5 h-5" />
              Categories & Types
            </motion.h4>
            <div className="space-y-3">
              <EndpointCard
                method="GET"
                path="/api/categories"
                description="Get all categories (public read access)"
                public={true}
              />
              <EndpointCard
                method="GET"
                path="/api/types"
                description="Get all data types (public read access)"
                public={true}
              />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Example Requests Section */}
      <motion.section
        id="examples"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Example Requests
          </motion.h3>

          <div className="space-y-8">
            {/* Login Example */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border rounded-lg bg-card p-6"
            >
              <h4 className="text-lg font-semibold mb-4">Login (curl)</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`curl -X POST https://your-domain.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "JabesNelma",
    "password": "your-password"
  }'`}</code>
              </pre>
            </motion.div>

            {/* Get Data Example */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border rounded-lg bg-card p-6"
            >
              <h4 className="text-lg font-semibold mb-4">Get All Data (curl)</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`curl https://your-domain.com/api/data`}</code>
              </pre>
            </motion.div>

            {/* Create Data Example */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border rounded-lg bg-card p-6"
            >
              <h4 className="text-lg font-semibold mb-4">Create Data Entry (curl)</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`curl -X POST https://your-domain.com/api/data \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -d '{
    "categoryId": "category-id",
    "typeId": "type-id",
    "title": "My Data Entry",
    "content": {
      "key": "value",
      "nested": {
        "data": "here"
      }
    },
    "source": "example"
  }'`}</code>
              </pre>
            </motion.div>

            {/* Fetch Example */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border rounded-lg bg-card p-6"
            >
              <h4 className="text-lg font-semibold mb-4">Fetch Data (JavaScript)</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`// Get all data (public)
const response = await fetch('https://your-domain.com/api/data');
const { success, data, message } = await response.json();

if (success) {
  console.log('Data entries:', data);
}

// Create data entry (requires admin token)
const createResponse = await fetch('https://your-domain.com/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  },
  body: JSON.stringify({
    categoryId: 'category-id',
    typeId: 'type-id',
    title: 'New Entry',
    content: { key: 'value' },
    source: 'my-app'
  })
});
const result = await createResponse.json();`}</code>
              </pre>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Getting Started Section */}
      <motion.section
        id="getting-started"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 py-16 bg-accent/50 -mx-4 px-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Getting Started
          </motion.h3>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <h4 className="text-xl font-semibold mb-4">1. Set Up the Project</h4>
              <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
                {[
                  "Clone the repository and install dependencies",
                  "Configure environment variables in .env file",
                  "Run database migrations",
                  "Start the development server",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ol>

              <motion.h4
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xl font-semibold mt-6 mb-3"
              >
                2. Create Admin User
              </motion.h4>
              <p className="text-muted-foreground">
                Use the seed endpoint to create your first admin user:
              </p>
              <motion.pre
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-muted p-4 rounded-lg mt-2 overflow-x-auto text-sm"
              >
                <code>{`curl -X POST http://localhost:3000/api/admin/seed \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "admin@example.com",
    "password": "secure-password",
    "seedKey": "admin-setup-key"
  }'`}</code>
              </motion.pre>

              <motion.h4
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xl font-semibold mt-6 mb-3"
              >
                3. Start Using the API
              </motion.h4>
              <p className="text-muted-foreground">
                Login with your admin credentials, get your access token, and start
                managing data entries.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Response Format Section */}
      <motion.section
        id="response-format"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Response Format
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border rounded-lg bg-card p-6"
          >
            <p className="text-muted-foreground mb-4">
              All API responses follow a consistent format:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}`}</code>
            </pre>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>success:</strong> Boolean indicating if the request was successful<br/>
              <strong>data:</strong> Response data (varies by endpoint)<br/>
              <strong>message:</strong> Descriptive message about the operation
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t bg-card mt-auto"
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-muted-foreground"
          >
            <p className="mb-2 text-lg font-semibold">
              Data Hub API - Generic Open Data Backend
            </p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-medium mb-1"
            >
              Created by <span className="text-primary font-bold">Jabes Nelma</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm"
            >
              Full Stack Developer • MIT License • Open Source
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
}

function EndpointCard({ method, path, description, public: isPublic, params, body }: {
  method: string;
  path: string;
  description: string;
  public: boolean;
  params?: string;
  body?: string;
}) {
  const methodColors: Record<string, string> = {
    GET: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ x: 10, transition: { type: "spring", stiffness: 300 } }}
      className="flex items-start gap-4 p-4 border rounded-lg bg-card hover:border-primary/50 transition-colors cursor-pointer"
    >
      <motion.span
        whileHover={{ scale: 1.1, rotate: [-5, 5, -5] }}
        transition={{ duration: 0.2 }}
        className={`px-3 py-1 rounded text-xs font-bold min-w-[60px] text-center ${methodColors[method]}`}
      >
        {method}
      </motion.span>
      <div className="flex-1">
        <code className="text-sm font-mono">{path}</code>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        {params && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-muted-foreground mt-2"
          >
            <strong>Query Params:</strong> {params}
          </motion.p>
        )}
        {body && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-muted-foreground mt-2"
          >
            <strong>Request Body:</strong> {body}
          </motion.p>
        )}
        <p className="text-xs mt-2">
          {isPublic ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="text-green-600 dark:text-green-400 inline-block"
            >
              ✓ Public Access
            </motion.span>
          ) : (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="text-red-600 dark:text-red-400 inline-block"
            >
              🔒 Admin Only
            </motion.span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
