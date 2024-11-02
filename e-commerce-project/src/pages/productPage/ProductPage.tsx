import Product from "../../components/generalComponents/product/Product";
import Comment from "../../components/generalComponents/product/comments/Comment";
import CommentForm from "../../components/generalComponents/product/commentForm/CommentForm";
import RelatedProducts from "../../components/generalComponents/product/relatedProducts/RelatedProducts";
import { useParams, useLocation } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const renderContent = () => {
    if (!id) {
      return <div>No Product ID Found</div>;
    }

    switch (location.pathname) {
      case `/product/${id}/comments`:
        return <Comment />;
      case `/product/${id}/reviews`:
        return <CommentForm />;
      case `/product/${id}/related-products`:
        return <RelatedProducts />;
      case `/product/${id}`:
      default:
        return <CommentForm />;
    }
  };

  return <Product>{renderContent()}</Product>;
};

export default ProductPage;
