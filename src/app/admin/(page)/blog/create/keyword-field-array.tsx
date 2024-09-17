"use client";
import { CirclePlus, Trash2 } from "lucide-react";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

const KeywordFieldArray = () => {
  const {
    control,
    getValues,
    setFocus,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "keyword",
  });

  const handleAppendField = () => {
    append({ value: "" });
    getValues();
  };
  const handleRemoveField = (index: number) => {
    remove(index);
    getValues();
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key == "Enter") {
      insert(index + 1, { value: "" });
    }
  };
  return (
    <div>
      <ul className="space-y-2">
        {fields.map((field, index) => {
          return (
            <li key={field.id}>
              <div className="flex gap-x-1">
                <Controller
                  defaultValue={field}
                  name={`keyword.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full rounded-lg px-3 py-1  border-2 border-gray-300 hover:border-gray-400 outline-1 outline-gray-400 transition-all duration-200 ease-in-out"
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      {...register(`keyword.${index}.value`, {
                        required: true,
                      })}
                    />
                  )}
                />
                <button
                  type="button"
                  disabled={index <= 0}
                  className="bg-red-500 hover:bg-red-500/80 px-2 rounded-md"
                  onClick={() => handleRemoveField(index)}
                >
                  <Trash2 className="text-white w-[16px] hover:cursor-pointer" />
                </button>
              </div>

              {
                //@ts-ignore
                errors?.keyword?.[index]?.value?.message && (
                  <p className="text-red-500 text-sm">
                    {
                      //@ts-ignore
                      errors?.keyword?.[index].value.message
                    }
                  </p>
                )
              }
            </li>
          );
        })}
      </ul>
      <button
        className="bg-green-500 hover:bg-green-500/80 mt-2 flex p-1 gap-x-1 rounded-md items-center"
        type="button"
        onClick={() => handleAppendField()}
      >
        <CirclePlus className="text-xl w-[16px]  text-white cursor-pointer" />
        <span className="text-white text-sm">Add</span>
      </button>
    </div>
  );
};

export default KeywordFieldArray;
