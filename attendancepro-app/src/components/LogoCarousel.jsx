"use client";

import React from "react";
import { motion } from "framer-motion";

const sponsors = [
  {
    name: "Microsoft",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Google",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Apple",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Amazon",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Netflix",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Meta",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
    name: "YouTube",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg",
  },
  {
    name: "Instagram",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
  },
  {
    name: "X (Twitter)",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg",
  },
  {
    name: "LinkedIn",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg",
  },
  {
    name: "GitHub",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  },
  {
    name: "NVIDIA",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
  },
  {
    name: "Mozilla Firefox",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg",
  },
  {
    name: "Notion",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
  },
  {
    name: "Adobe XD",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg",
  },
  {
    name: "Figma",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
  {
    name: "Slack",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png",
  },
  {
    name: "VS Code",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
  },
  {
    name: "Python",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  },
  {
    name: "React",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    name: "Node.js",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  },
  {
    name: "PostgreSQL",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
  },
  {
    name: "MongoDB",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
  },
  {
    name: "Docker",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg",
  },
  {
    name: "Tailwind CSS",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
];

export default function Logo() {
  const logos = [...sponsors, ...sponsors];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-600">Our sponsors</h3>
      </div>
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-x-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
        >
          {logos.map((sponsor, idx) => (
            <div key={idx} className="flex-shrink-0">
              <img
                src={sponsor.src}
                alt={`${sponsor.name} Logo`}
                className="h-12 w-auto hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
