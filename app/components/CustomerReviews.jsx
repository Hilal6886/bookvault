import { Rating } from "@mui/material";

export default function CustomerReviews() {
  const list = [
    {
      name: "Penny Albritton",
      message:
        "Book Vault has an amazing collection of books! I found rare editions that I couldn't locate elsewhere. The delivery was prompt, and the packaging was excellent.",
      rating: 4.5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-1.jpg?v=1721992196&width=512",
    },
    {
      name: "Oscar Nomanee",
      message:
        "I love shopping at Book Vault! The website is user-friendly, and the recommendations are spot on. Highly recommended for all book lovers.",
      rating: 5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-5.jpg?v=1721992196&width=512",
    },
    {
      name: "Emma Watson",
      message:
        "Book Vault's customer service is exceptional! They helped me pick the perfect book for my niece, and she loved it. I'll definitely shop here again.",
      rating: 4.5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-6.jpg?v=1721992197&width=512",
    },
  ];
  
  return (
    <section className="flex justify-center mt-4">
      <div className="w-full p-5 md:max-w-[900px] flex flex-col gap-3">
        <h1 className="text-center font-sectionTitle font-semibold  mb-4 text-xl">
          Our customers love
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {list?.map((item) => {
            return (
              <div className="flex flex-col gap-2 p-4 rounded-lg justify-center items-center border">
                <img
                  src={item?.imageLink}
                  className="h-32 w-32 rounded-full object-cover"
                  alt=""
                />
                <h1 className="text-sm font-semibold">{item?.name}</h1>
                <Rating
                  size="small"
                  name="customer-rating"
                  defaultValue={item?.rating}
                  precision={item?.rating}
                  readOnly
                />
                <p className="text-sm text-gray-500 text-center">
                  {item?.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}