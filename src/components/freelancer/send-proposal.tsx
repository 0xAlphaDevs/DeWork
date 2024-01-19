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

const SendProposal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sendRequestSuccess, setSendRequestSuccess] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    budget: "",
  });

  function handleClick() {
    // reset all state values
    setFormData({
      description: "",
      budget: "",
    });
    setSendRequestSuccess(false);
    setIsLoading(false);
  }

  const constructJobData = (
    description: string,

    budget: string
  ) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const newJobData = {
      description: description,
      budget: budget,
      createdAt: `${currentDate} ${currentTime}`,
    };
    return newJobData;
  };

  async function sendData() {
    try {
      setIsLoading(true);
      const newJobData = constructJobData(
        formData.description,

        formData.budget
      );
      console.log(" Data: ", newJobData);

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
    <div className="flex justify-between items-center ">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={handleClick}
            className="bg-green-950 hover:bg-green-800   dark:bg-purple-50"
          >
            <PlusCircledIcon className="mt-0.5" />
            <span className="w-2"> </span>Apply
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-40 gap-4">
              <p>Creating Proposal ...</p>
            </div>
          ) : (
            <>
              {!sendRequestSuccess ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Create New Job.</DialogTitle>
                    <DialogDescription>
                      Enter details to send a proposal.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmitRequest}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="description"
                          placeholder="Blockchain developer"
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
                        <Label htmlFor="budget" className="text-right">
                          Budget
                        </Label>
                        <Input
                          id="Tags"
                          placeholder="Blockchain developer"
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
                      <Button type="submit">Send</Button>
                    </DialogFooter>
                  </form>
                </>
              ) : (
                <div className="flex flex-col gap-4 items-center">
                  <CheckCircledIcon className="w-20 h-20 text-green-500" />
                  <p>Proposal sent Successfully</p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SendProposal;
