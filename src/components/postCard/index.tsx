import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { useUserAuth } from '@/context/userAuthContext';
// import { HeartIcon } from '@heroicons/react/solid'; // Ensure you have this or any other icon library
// import cn from 'classnames'; // Ensure you have this installed
import { DocumentResponse } from '@/types';
import image2 from '@/assets/images/image2.jpg';


interface IPostCardProps{
    data:DocumentResponse;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data, image2 }) => {
  const { user } = useUserAuth();
  const {likesInfo, setLikesInfo}=React.useState<{
    likes:number;
    isLike:Boolean;
  }>({
    likes:data.likes,
    isLike:data.userLikes.includes(user?.uid) ? true:false,
  })

  const updateLike =async (isVal:boolean) => {
    setLikesInfo({
        likes: isVal ? likesInfo.likes+1:likesInfo.likes-1
    })
  }
  return (
    <Card className='mb-6'>
      <CardHeader className='flex flex-col p-3'>
        <CardTitle className="text-sm text-center flex justify-center">
          <span className='mr-2'>
            <img 
              src={image2}
              className='w-10 h-10 rounded-full border-2'
              alt="User"
            />
          </span>
          <span>{user ? user.displayName : "Guest_User"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <img 
          src={data.photos && data.photos.length > 0 ? data.photos[0].cdnURL : ""}
          alt="Post Content"
          className="w-full"
        />
      </CardContent>
      <CardFooter className="flex flex-col p-3">
        <div className='flex justify-between w-full mb-3'>
          <HeartIcon 
          className={cn(
            "mr-3", 
            "cursor-pointer",
            likesInfo.isLike ? "fill-red-500" : "fill-none"
            )} />
            onClick={updateLike(!likesInfo.isLike)}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
