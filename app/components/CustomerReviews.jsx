import { Rating } from "@mui/material";

export default function CustomerReviews() {
  const list = [
    {
      name: "Penny Albritton",
      message:
        "BOOK VAULT is my go-to store for all my reading needs! Their selection is vast, and every book I've bought has been in excellent condition. Highly recommend!",
      rating: 4.5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-1.jpg?v=1721992196&width=512",
    },
    {
      name: "Oscar Nommanee",
      message:
        "I absolutely love shopping at BOOK VAULT! The prices are amazing, and their delivery service is top-notch. I'll definitely be buying more books from here.",
      rating: 5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-5.jpg?v=1721992196&width=512",
    },
    {
      name: "Emma Watson",
      message:
        "BOOK VAULT always has the latest releases and great discounts. Their customer service is fantastic, and I always feel valued as a customer. Highly satisfied!",
      rating: 4.5,
      imageLink:
        "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-6.jpg?v=1721992197&width=512",
    },
  ];

  return (
    <section className="flex justify-center">
      <div className="w-full p-5 md:max-w-[900px] flex flex-col gap-3 mt-6">
        {/* Section Title with Success Color BG and XL Rounded */}
        <div className="bg-green-500 text-white text-center text-lg font-semibold rounded-xl p-1 mb-6">
          Testimonial
        </div>

        <h1 className="text-center font-semibold text-xl">
          Why Readers Trust BOOK VAULT
        </h1>
        <p className="text-center text-sm text-gray-500">
          Top-rated books and exceptional service.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {list?.map((item) => {
            return (
              <div
                key={item.name}
                className="flex flex-col gap-2 p-4 rounded-lg justify-center items-center border bg-green-100"
              >
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
                <p className="text-sm text-gray-500 text-center">{item?.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
