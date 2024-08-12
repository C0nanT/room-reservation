import EditForm from "@/components/EditForm";


export const EditFormPage = async({ params }: { params: { id: string } }) => {
  return <EditForm id={params.id} />;
};

export default EditFormPage;
