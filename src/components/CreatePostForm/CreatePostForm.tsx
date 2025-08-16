import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePost } from "../../types/post";
import { createPost } from "../../services/postService";

interface CreatePostFormValues {
  title: string;
  body: string;
}

const initialValues: CreatePostFormValues = {
  title: "",
  body: "",
};

const validateSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title too short")
    .max(50, "Title too long")
    .required("Title is required"),
  body: Yup.string()
    .max(500, "Message too long")
    .required("Content is required"),
});

interface CreatePostFormProps {
  onCancel: () => void;
}

export default function CreatePostForm({ onCancel }: CreatePostFormProps) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreatePost) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onCancel();
      alert("Post created successfully!");
    },
    onError: (error) => {
      console.error("Create post error:", error);
    },
  });
  const handleSubmit = (
    values: CreatePostFormValues,
    actions: FormikHelpers<CreatePostFormValues>
  ) => {
    console.log("Order data:", values);
    createMutation.mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validateSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field
            id="body"
            as="textarea"
            name="body"
            rows="8"
            className={css.textarea}
          />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            {createMutation.isPending ? "Creating..." : "Create post"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
