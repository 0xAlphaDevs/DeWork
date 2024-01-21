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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { useContractWrite } from "wagmi";
import { deworkContract } from "@/lib/contracts";

interface CreateJobForm {
  title: string;
  description: string;
  tags: string;
  budget: string;
}

const CreateNewJobForm = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateJobForm>({
    title: "",
    description: "",
    tags: "",
    budget: "",
  });

  const { data, isSuccess, isLoading, write } = useContractWrite({
    address: "0x1FD044132dDf03dF133bC6dB12Bd7C4093857523",
    abi: deworkContract.abi,
    functionName: "createJob",
    args: [],
  });

  function handleClick() {
    // reset all state values
    setFormData({
      title: "",
      description: "",
      tags: "",
      budget: "",
    });
  }

  const constructJobData = (
    title: string,
    description: string,
    tags: string,
    budget: string
  ) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const newJobData = {
      title: title,
      description: description,
      createdAt: `${currentDate} ${currentTime}`,
      tags: [tags],
      budget: budget,
    };
    return newJobData;
  };

  async function createJob() {
    try {
      // setIsLoading(true);
      const newJobData = constructJobData(
        formData.title,
        formData.description,
        formData.tags,
        formData.budget
      );
      console.log(" Data: ", newJobData);

      write({
        args: [
          newJobData.title,
          newJobData.description,
          newJobData.createdAt,
          newJobData.tags,
          Number(newJobData.budget) * 10 ** 18,
        ],
      });
      //   const result = await saveJobData(formData.title);

      // setIsLoading(false);
    } catch (error) {
      console.error("Error submitting record:", error);
      // setIsLoading(false);
    }
  }

  const handleSubmitRequest = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Creating request...");
    console.log("Form Data: ", formData);
    await createJob();
  };

  return (
    <div className="flex justify-between items-center py-8 px-8">
      <div className="text-4xl text-center font-semibold ">My Jobs</div>
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
              {!isSuccess ? (
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
                          id="title"
                          placeholder="Enter job title"
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="description"
                          placeholder="Enter job description"
                          className="col-span-3"
                          value={formData.description}
                          onChange={(e: { target: { value: any } }) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tags" className="text-right">
                          Add Tag
                        </Label>
                        <Select
                          onValueChange={(value: string) =>
                            setFormData({
                              ...formData,
                              tags: value,
                            })
                          }
                          required
                          name="userType"
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a user type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Front-end">
                                Front-end Development
                              </SelectItem>
                              <SelectItem value="Back-end">
                                Back-end Development
                              </SelectItem>
                              <SelectItem value="Mobile App">
                                Mobile App Development
                              </SelectItem>
                              <SelectItem value="Game Development">
                                Game Development
                              </SelectItem>
                              <SelectItem value="AI / ML">AI / ML</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="budget" className="text-right">
                          Budget
                        </Label>
                        <Input
                          id="Tags"
                          type="number"
                          placeholder="Enter GHO amount"
                          className="col-span-3"
                          value={formData.budget}
                          onChange={(e: { target: { value: any } }) =>
                            setFormData({
                              ...formData,
                              budget: e.target.value,
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
                  <p>Job created Successfully </p>
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
