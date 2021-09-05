import React, { useState } from "react";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  FaUtensils,
  FaLanguage,
  FaSignature,
  FaStar,
  FaEye,
} from "react-icons/fa";

export default function Profiles() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProfiles() {
    try {
      setLoading(true);
      setRepos([]);
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRepos() {
    try {
      const response = await axios.get(profile.repos_url);
      setRepos(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex-col items-center justify-center h-screen ">
      <div className="flex items-center justify-center">
        <div className="mr-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-md "
          />
        </div>
        {!loading ? (
          <button
            onClick={() => fetchProfiles()}
            className="bg-purple-600 cursor-pointer hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-md px-3 py-1"
            style={{ marginTop: "25px" }}
          >
            <label className="text-white text-sm font-bold mb-2 cursor-pointer">
              Search
            </label>
          </button>
        ) : (
          <button
            style={{ marginTop: "25px" }}
            className="bg-purple-600 cursor-pointer animate-spin hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-md px-2 py-1 "
          />
        )}
      </div>
      {profile.avatar_url && (
        <div className="grid grid-rows-3">
          <div className="flex items-center justify-center">
            <label className=" text-gray-700 text-sm font-bold mb-2">
              {profile.login} has {profile.public_repos} public repos
            </label>
          </div>
          <div className="flex items-center justify-center mb-3">
            <Image
              alt="avatar"
              src={profile.avatar_url}
              width="60"
              height="60"
              className="w-2 h-2 rounded-full"
            />
          </div>
          <div className="flex items-center justify-center">
            <div>
              <button
                onClick={() =>
                  repos.length === 0 ? fetchRepos() : setRepos([])
                }
                className="bg-purple-600 cursor-pointer hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-md px-3 py-1"
              >
                <label className="text-white text-sm font-bold mb-2 cursor-pointer">
                  {repos.length === 0 ? "show repos" : "hide repos"}
                </label>
              </button>
            </div>
          </div>
        </div>
      )}
      {repos.length > 0 && (
        <div className="grid grid-cols-3">
          {repos.map((repo, idx) => (
            <div key={idx} className="shadow rounded m-2 p-3">
              <div className="flex align-center justify-center mb-2">
                <div className="flex align-center justify-center">
                  <FaSignature className="mr-2" size={20} />
                  <label className="text-gray-700 text-sm font-bold">
                    Name:{" "}
                  </label>
                </div>
                <div className="ml-2 flex align-center justify-center">
                  <label className="text-gray-700 text-sm font-bold hover:text-purple-700 ">
                    <Link href={repo.html_url}>{repo.name}</Link>
                  </label>
                </div>
              </div>
              <div className="flex align-center justify-center mb-2">
                <div className="flex align-center justify-center">
                  <FaStar className="mr-2 " size={20} color="#FFD700" />
                  <label className="text-gray-700 text-sm font-bold">
                    Stars:{" "}
                  </label>
                </div>
                <div className="ml-2 flex align-center justify-center">
                  <label className="text-gray-700 text-sm font-bold">
                    {repo.stargazers_count}
                  </label>
                </div>
              </div>
              <div className="flex align-center justify-center mb-2">
                <div className="flex align-center justify-center">
                  <FaEye className="mr-2" size={20} />
                  <label className="text-gray-700 text-sm font-bold">
                    Watchers:{" "}
                  </label>
                </div>
                <div className="ml-2 flex align-center justify-center">
                  <label className="text-gray-700 text-sm font-bold">
                    {repo.watchers}
                  </label>
                </div>
              </div>
              <div className="flex align-center justify-center">
                <div className="flex align-center justify-center">
                  <FaUtensils className="mr-2" color="#E0E0E0" />
                  <label className="text-gray-700 text-sm font-bold">
                    Forks:{" "}
                  </label>
                </div>
                <div className="ml-2 flex align-center justify-center">
                  <label>{repo.forks}</label>
                </div>
              </div>
              <div className="flex align-center justify-center">
                <div className="flex align-center justify-center">
                  <FaLanguage className="mr-2" size={20} />
                  <label className="text-gray-700 text-sm font-bold">
                    Language:{" "}
                  </label>
                </div>
                <div className="ml-2 flex align-center justify-center">
                  <label className="text-gray-700 text-sm font-bold">
                    {repo.language}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
