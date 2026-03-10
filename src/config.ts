export const siteConfig = {
  name: "Nazar Moshkun",
  title: "Data Engineer | Database Architect| Cloud Analytics",
  description: "Coding Portfolio & Blog",
  accentColor: "#1d4ed8",
  social: {
    email: "moshkunnazar@gmail.com",
    linkedin: "https://www.linkedin.com/in/nazar-moshkun-1010551b6/",
    github: "https://github.com/Misterduo/MoshingCode",
  },
  aboutMe:
  "I’m a data professional with experience in data engineering and analytics, working with SQL, Python, and BI tools to build data pipelines and turn complex data into useful insights. I enjoy solving problems and continuously learning new technologies. Outside of work, I’m also involved in creative projects — I perform in theatre, appear in short films, and explore different artistic endeavours.",
  skills: [
    "Python",
    "SQL",
    "AWS",
    "GCP",
    "ETL Pipelines",
    "Apache Spark",
    "Airflow",
    "Kafka",
    "Power BI",
    "Tableau",
    "Looker"
  ],
  projects: [
    {
      name: "Multilingual CRM AI Assistant & Analytics Chatbot",
      description:
        "An internal AI-powered chatbot designed for a custom CRM web application to replace a third-party analytics tool and reduce external dependencies and costs. The system interprets natural language queries using transformer-based semantic embeddings and spaCy NLP models to understand user intent across multiple languages (English, Polish, German). It enables users to retrieve analytics, execute SQL-based insights, and generate operational reports directly through conversational interaction. The assistant integrates with Microsoft SQL Server and SSRS to run stored procedures, perform data lookups, and dynamically generate downloadable Excel or PDF reports on demand. The solution also supports conversational context, smart suggestions, fuzzy matching, and automated report parameter collection to streamline business intelligence workflows inside the CRM.",
      //link: "https://aidevroundup.com/?ref=devportfolio",
      skills: [
              "Python",
              "Sentence Transformers",
              "spaCy",
              "NLP",
              "PyODBC",
              "SQL Server",
              "SSRS",
              "REST API",
              "OpenPyXL"
            ],
    },
    {
      name: "Web CRM Reporting ETL Automation (Selenium + Python)",
      description:
        "A Python-based automation tool that extracts reports from a web-based CRM system. Using Selenium, the script logs into the CRM and reporting portals, generates branch-specific reports when they are not yet available, and downloads them automatically. The data is then transformed using pandas and loaded into a Microsoft SQL Server database via pyodbc, creating a complete automated ETL pipeline for CRM reporting.",
      //link: "https://fullstackextensions.com/?ref=devportfolio",
      skills: ["Python", "Selenium", "Pandas", "SQL Server", "PyODBC", "ETL"],
    },
    {
      name: "Prediction of Gamers Behaviour Using Big Data Technology: A Data-Driven Approach to Identifying Gamification System Triggers for Enhancing Player Engagement and Incentivized Advertising",
      description:
        "The project helped examine how to optimize the timing and exposure of gamification elements in mobile games, addressing a gap in existing gamification research. Using data collected from users across two mobile games via TensorFlow-based image recognition, the study applies a Variable Order Markov Model (VOMM) to analyze player behavior sequences. The results show that VOMM can effectively predict future user actions and identify event patterns that lead to desired outcomes. The research demonstrates practical applications of VOMM for mobile gaming analytics and proposes a method for integrating gamification triggers into third-party tools to improve user engagement.",
      //link: "https://extensionkit.io/?ref=devportfolio",
      skills: ["Python", "R", "A/B testing", "Apache Kafka", "Apache Hadoop", "Pickle", "OpenCV", "Tensorflow", "Pytube", "Numpy", "Pandas", "Matplot"],
    },
    {
      name: "Automatic Youtube and Twitch Video Frame Scrapper",
      description:
        "A Python-based automation tool for collecting gameplay data from video distribution platforms. The program accesses platform video lists, downloads selected videos, and splits them into frames at configurable time intervals. Each frame is then processed using a pre-trained image recognition model stored in a pickle file to detect relevant in-game events. The entire workflow runs automatically, enabling efficient extraction of gameplay sequences for further analytics and modeling.",
        //link: "https://extensionkit.io/?ref=devportfolio",
      skills: ["Python", "Pickle", "OpenCV", "Tensorflow", "Pytube", "Numpy", "Scrapping"],
    },
  ],
  experience: [
    {
      company: "LRC Group",
      title: "Data Engineer",
      dateRange: "Mar 2024 - Present",
      bullets: [
        "Designed and maintained back-end data architecture across SQL Server, SAP HANA, and Cloud PostgreSQL environments, including documentation of data models and financial process workflows.",
        "Developed and deployed Python-based ETL pipelines supporting internal analytics, financial reporting, and   data integrations across multiple systems, nullifying hours needed on creating manual reporting.",
        "Administered and maintained company cloud infrastructure across GCP, supporting data platform development, deployment, and system reliability.",
        "Built an internal analytics chat assistant using fine-tuned sentence transformer models in Python to streamline data access and internal reporting workflows for a multinational cross-team cooperation and analytics.",
        "Developed and deployed an external AI-powered chatbot hosted in GCP to support automated analytics.",
        "Coordinated mentoring of junior analysts and engineers, organizing onboarding roadmaps, and leading knowledge-sharing initiatives within data teams."
      ],
    },
    {
      company: "Prosperity Behavioral Health",
      title: "Data Analyst",
      dateRange: "Nov 2022 - Mar 2024",
      bullets: [
        "Developed Power Query, Looker, and Tableau dashboards used by 30+ clients, improving billing transparency and financial monitoring.",
        "Maintained PostgreSQL database and transitioned legacy R code into AWS-based Python pipelines reducing deployment time by 30% and removing semi-manual dependency.",
        "Engineered billing workflows using Python, AWS, and Power Automate, boosting efficiency of data processing and allowing smoother inner team collaboration.",
      ],
    },
    {
      company: "Marsh McLennan",
      title: "Cash Collection Analyst",
      dateRange: "Apr 2022 - Nov 2022",
      bullets: [
        "Prepared ad hoc, daily, or monthly reports using financial data in Excel.",
        "Automated simple reporting steps using Power Query and Macros.",
      ],
    },
  ],
  education: [
    {
      school: "SGH Warsaw School of Economics",
      degree: "Master Degree in Big Data",
      dateRange: "2022 - 2024",
      achievements: [
        "Graduated with 5",
        "Focused on ML Python-based projects",
        "Specialized in SQL, Python and SAS",
      ],
    },
    {
      school: "SGH Warsaw School of Economics",
      degree: "Bachelor Degree in Global Business, Finance and Governance",
      dateRange: "2019 - 2022",
      achievements: [
        "Graduated with 4.5",
        "Participated in Central Europe Connect 2020",
        "Member of SKN Zarządzania Projektami",
      ],
    },
  ],
};
