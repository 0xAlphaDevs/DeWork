import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";

const CreateNewJobForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sendRequestSuccess, setSendRequestSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });

  function handleClick() {
    // reset all state values
    setFormData({
      title: "",
    });
    setSendRequestSuccess(false);
    setIsLoading(false);
  }

  const constructJobData = (title: string) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const newJobData = {
      title: title,
      requestedOn: `${currentDate} ${currentTime}`,
    };
    return newJobData;
  };

  async function sendData() {
    try {
      setIsLoading(true);
      const newJobData = constructJobData(formData.title);
      console.log(" Data: ", newJobData);

      const result = await saveJobData(formData.title);

      setIsLoading(false);
      setSendRequestSuccess(true);
    } catch (error) {
      console.error("Error submitting record:", error);
      setIsLoading(false);
    }
  }

  const handleSubmitRequest = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Creating request...");
    console.log("Form Data: ", formData);
    await sendData();
  };

  return (
    <div className="flex justify-between items-center py-8">
      <div className="text-4xl text-center font-semibold ">Jobs</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={handleClick}
            className="bg-green-950 hover:bg-green-800   dark:bg-purple-50"
          >
            <PlusCircledIcon className="mt-0.5" />
            <span className="w-2"> </span>Create New Job
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-4">
              {/* <Loader /> */}
              <p>Creating Job ...</p>
            </div>
          ) : (
            <>
              {!sendRequestSuccess ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Create New Job.</DialogTitle>
                    <DialogDescription>
                      Enter details to create a new job.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitRequest}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Job title
                        </Label>
                        <Input
                          id="username"
                          placeholder="Blockchain developer"
                          className="col-span-3"
                          value={formData.title}
                          onChange={(e: { target: { value: any } }) =>
                            setFormData({
                              ...formData,
                              title: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create</Button>
                    </DialogFooter>
                  </form>
                </>
              ) : (
                <div className="flex flex-col gap-4 items-center">
                  <CheckCircledIcon className="w-20 h-20 text-green-500" />
                  <p>Job created Successfully</p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewJobForm;

function saveJobData(title: any) {
  throw new Error("Function not implemented.");
}
