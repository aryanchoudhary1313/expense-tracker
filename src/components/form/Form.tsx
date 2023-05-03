import { useForm } from "react-hook-form";
import "./form.css";
import categories from "../categories";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z.string().min(3).max(50, "This Field is required"),
  amount: z.number().min(0.01).max(100_000).optional(),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Categories Is required" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

export default function Form({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="form">
        <label className="form-label" htmlFor="description">
          Description
          <input
            {...register("description")}
            id="description"
            className="form-control"
            type="text"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </label>
        <label className="form-label" htmlFor="amount">
          Amount
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            className="form-control"
            type="number"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </label>
        <label className="form-label" htmlFor="category">
          Category
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            {errors.category && (
              <p className="text-danger">{errors.category.message}</p>
            )}
          </select>
        </label>

        <button className="btn btn-primary submit-btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
