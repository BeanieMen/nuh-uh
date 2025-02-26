"use client";
import { useState, useEffect } from "react";
import Background from "../components/Background";
import { MapPin, Download, Github } from "lucide-react";
import {
  SiTypescript,
  SiNuxtdotjs,
  SiDocker,
  SiGithubactions,
  SiGit,
  SiLinux,
  SiPostman,
  SiVitest,
  SiOracle,
  SiThreedotjs,
} from "react-icons/si";
import { MdOutlineGridOn } from "react-icons/md";
import { DiTerminal } from "react-icons/di";

const skills = [
  { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" />, url: "https://www.typescriptlang.org/" },
  { name: "Nuxt", icon: <SiNuxtdotjs className="w-5 h-5" />, url: "https://nuxt.com/" },
  { name: "Docker", icon: <SiDocker className="w-5 h-5" />, url: "https://www.docker.com/" },
  { name: "CI/CD", icon: <SiGithubactions className="w-5 h-5" />, url: "https://github.com/features/actions" },
  { name: "REST APIs", icon: <SiPostman className="w-5 h-5" />, url: "https://restfulapi.net/" },
  { name: "Git", icon: <SiGit className="w-5 h-5" />, url: "https://git-scm.com/" },
  { name: "Bash", icon: <DiTerminal className="w-5 h-5" />, url: "https://www.gnu.org/software/bash/" },
  { name: "Linux", icon: <SiLinux className="w-5 h-5" />, url: "https://www.linux.org/" },
  { name: "Three.js", icon: <SiThreedotjs className="w-5 h-5" />, url: "https://threejs.org/" },
  { name: "Vitest", icon: <SiVitest className="w-5 h-5" />, url: "https://vitest.dev/" },
  { name: "WebGL", icon: <MdOutlineGridOn className="w-5 h-5" />, url: "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API" },
  { name: "Oracle", icon: <SiOracle className="w-5 h-5" />, url: "https://www.oracle.com/" },
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={"relative w-screen min-h-screen bg-[#161616] text-white overflow-auto"}>
      <Background />
      <div className="mx-5">
        <div className="max-w-2xl mx-auto mt-20 relative z-20">
          {/* Main Content */}
          <div className="flex flex-col items-start mb-20 relative z-30">
            {/* Animated Name */}
            <h1 className="text-5xl font-bold mb-5 animated-gradient-text">
              Aarjav Jain
            </h1>
            <p className="text-2xl text-[#a0a0a0]">Infrastructure enthusiast.</p>
            <p className="text-2xl text-[#a0a0a0]">
              Working on{" "}
              <a href="https://nexusplay.net" className="text-white animated-underline">
                @NexusPlay
              </a>
            </p>

            {/* Location and Time */}
            <div className="flex items-center gap-3 mt-6 text-[#a0a0a0] text-xl">
              <MapPin className="w-5 h-5" />
              <span>Delhi, India</span>
              <span>•</span>
              <span>{currentTime}</span>
            </div>

            {/* Resume & GitHub Buttons */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 bg-white text-black border border-black rounded-lg transition-transform transform hover:scale-105 hover:bg-opacity-80"
              >
                <Download className="w-5 h-5" />
                <span className="font-semibold">Resume</span>
              </a>
              <a
                href="https://github.com/BeanieMen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg transition-transform transform hover:scale-105 hover:bg-opacity-80 border border-black"
                aria-label="Visit BeanieMen's GitHub profile"
              >
                <Github className="w-6 h-6 text-black" />
              </a>
            </div>
          </div>

          {/* Skills Section */}
          <div className="relative z-30">
            <h2 className="text-5xl font-semibold mb-6 animated-gradient-text">
              Skills
            </h2>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-[#212121] border border-gray-500 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-[#333333]"
                >
                  {skill.icon}
                  <span>{skill.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animated-gradient-text {
          background: linear-gradient(90deg, #8b5cf6, #7c3aed, #6d28d9, #5b21b6, #6d28d9, #7c3aed, #8b5cf6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientScroll 3s linear infinite;
        }
        @keyframes gradientScroll {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        .animated-underline {
          position: relative;
          text-decoration: none;
        }
        .animated-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #8b5cf6, #7c3aed, #6d28d9, #5b21b6, #6d28d9, #7c3aed, #8b5cf6);
          background-size: 200% auto;
          animation: gradientScroll 3s linear infinite;
        }
        a,
        button {
          transition: all 0.3s ease;
        }
        a:hover,
        button:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}
