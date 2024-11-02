import { useParams } from "react-router-dom";
import productService from "../../../../services/productService";
import { useEffect, useState } from "react";
import Score from "../score/Score";
interface Review {
  comment: string;
  createdAt: string;
  name: string;
  rating: number;
  updateAt: string;
  user: string;
  _id: string;
}

const Comment = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { id } = useParams();

  const fetchProduct = async () => {
    const res = await productService.getProduct(String(id));
    setReviews(res.reviews);
  };

  useEffect(() => {
    fetchProduct();
    reviews.map((rev) => console.log(rev));
  }, [id]);

  return (
    <div className="overflow-y-auto h-full flex flex-col gap-5 justify-start items-center">
      {reviews.map((review) => (
        <div
          className="bg-base-side dark:bg-dark-base-side w-full rounded-[0.8rem] p-6 flex flex-col gap-5 justify-center items-start"
          key={review._id}
        >
          <div className="flex justify-between items-center text-text-secondary dark:text-dark-text-secondary text-[1.4rem] font-normal w-full">
            <p>{review.name}</p>
            <p>{new Date(review.createdAt).toLocaleDateString("fa-IR")}</p>
          </div>
          <div className="text-text-primary dark:text-dark-text-primary font-normal text-[1.4rem]">
            {review.comment}
          </div>
          <Score count={review.rating} />
        </div>
      ))}
    </div>
  );
};

export default Comment;
