import React from 'react';
import { Course } from '../types';
import { Play, Lock } from 'lucide-react';

interface NetflixCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const NetflixCard: React.FC<NetflixCardProps> = ({ course, onClick }) => {
  return (
    <div 
      onClick={() => onClick(course)}
      className="group relative flex-shrink-0 w-[280px] md:w-[320px] aspect-video rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 hover:shadow-glow-lg overflow-hidden bg-white shadow-md border border-gray-100"
    >
      {/* Base Image */}
      <img 
        src={course.imageUrl} 
        alt={course.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Title Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
         <div className="absolute bottom-0 left-0 p-5 w-full">
            <p className="text-brand-accent text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-md">
              {course.software}
            </p>
            <h3 className="text-white font-display font-bold text-lg leading-tight drop-shadow-lg">
              {course.title}
            </h3>
         </div>
      </div>

      {/* Lock Icon */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg group-hover:opacity-0 transition-opacity duration-200">
         <Lock size={14} className="text-brand-primary" />
      </div>

      {/* Hover Content */}
      <div className="absolute inset-0 p-5 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between z-20">
         
         <div className="relative h-32 -mx-5 -mt-5 mb-2 overflow-hidden">
            <img src={course.imageUrl} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-glow transform scale-90 group-hover:scale-100 transition-transform">
                  <Play size={20} fill="currentColor" className="ml-1" />
               </div>
            </div>
         </div>

         <div>
            <h3 className="font-display font-bold text-base text-gray-900 mb-1 line-clamp-1">
              {course.title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
              {course.description}
            </p>
            
            <div className="flex items-center gap-3 text-[10px] font-medium">
               <span className="bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded">
                  {course.software}
               </span>
               <span className="text-gray-400">12h 30m</span>
            </div>
         </div>
      </div>
    </div>
  );
};
