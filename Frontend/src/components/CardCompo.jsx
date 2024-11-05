
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faUtensils, faBriefcaseMedical, faPaw, faBroom, faTshirt } from "@fortawesome/free-solid-svg-icons";

const CardComponent = ({ setCurrentPage }) => {
  const cardData = [
    {
      title: "Children Education",
      description: "Empower young minds through education",
      link: "education-donation",
      bgColor: "bg-blue-100",
      status: "Active",
      icon: faGraduationCap,
    },
    {
      title: "Food Donation",
      description: "Help feed the hungry and bring hope",
      link: "food-donation",
      bgColor: "bg-orange-100",
      status: "Active",
      icon: faUtensils,
    },
    {
      title: "Health Support",
      description: "Support medical care for those in need",
      link: "treatment-donation",
      bgColor: "bg-teal-100",
      status: "Active",
      icon: faBriefcaseMedical,
    },
    {
      title: "Animal Shelter",
      description: "Provide a safe haven for furry friends",
      link: "animal-donation",
      status: "Closed",
      bgColor: "bg-green-100",
      icon: faPaw,
    },
    {
      title: "Cleanliness",
      description: "Contribute to a cleaner, healthier environment",
      link: "cleanliness-donation",
      status: "Active",
      bgColor: "bg-yellow-100",
      icon: faBroom,
    },
    {
      title: "Clothes Donation",
      description: "Donate warm clothing for those in need",
      link: "clothes-donation",
      bgColor: "bg-pink-100",
      status: "Active",
      icon: faTshirt,
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-[#f0f0f0] shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          onClick={() => setCurrentPage(card.link)}
        >
          <div className="bg-[#910b0b] p-4 flex justify-center items-center">
            <div className="w-12 h-12 bg-[#fefefe] rounded-full flex justify-center items-center shadow-md">
              <FontAwesomeIcon icon={card.icon} className="text-2xl text-[#2d6a4f]" />
            </div>
          </div>
          <div className="p-4 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-gray-500 text-sm mb-3">{card.description}</p>
            <h3 className="text-md font-semibold mb-3">
              <span className="text-[#e1ad01]">Status:</span> {card.status}
            </h3>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-[#0bb5ff] hover:text-[#60d394] font-bold transition duration-300 text-sm"
            >
              Explore
            </a>
          </div>
        </div>
      ))}
    </div>
  );
  
  
};

export default CardComponent;