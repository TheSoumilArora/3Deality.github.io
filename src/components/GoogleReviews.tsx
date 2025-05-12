import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// Type for Google Reviews data
interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url: string;
}

const GoogleReviews: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['googleReviews'],
    queryFn: async () => {
      // This would be implemented in a Vercel backend function
      // For now, we'll use placeholder data that matches the format
      const mockReviews: GoogleReview[] = [
        {
          author_name: "Vikram S.",
          rating: 5,
          relative_time_description: "a week ago",
          text: "The quality of the 3D printed drone parts I ordered was outstanding. Perfect fit and excellent durability. Will definitely order again!",
          profile_photo_url: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
        },
        {
          author_name: "Priya M.",
          rating: 5,
          relative_time_description: "2 weeks ago",
          text: "I uploaded my own design and received it within a week. The print quality exceeded my expectations and the customer service was excellent.",
          profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
        },
        {
          author_name: "Rahul J.",
          rating: 5,
          relative_time_description: "a month ago",
          text: "The miniatures I ordered for my tabletop game were incredibly detailed. Amazing what they can achieve with 3D printing technology.",
          profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
        }
      ];
      
      return mockReviews;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        Error loading Google reviews. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
      {data?.map((review, index) => (
        <div key={index} className="p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-4">
            <img
              src={review.profile_photo_url}
              alt={`${review.author_name}'s profile`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{review.author_name}</p>
              <p className="text-xs text-gray-500">{review.relative_time_description}</p>
            </div>
          </div>
          <div className="flex space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="mb-4 text-gray-600">
            "{review.text}"
          </p>
          <p className="font-semibold">via Google Reviews</p>
        </div>
      ))}
    </div>
  );
};

export default GoogleReviews;