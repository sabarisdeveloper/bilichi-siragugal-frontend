"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Header from "@/components/layout/Header";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import RadioGroup from "@/components/common/RadioGroup";
import Button from "@/components/common/Button";

import api from "@/services/api";
import bloodGroups from "@/constants/bloodGroups";
import labels from "@/constants/labels";
import genderOptions from "@/constants/genderOptions";
import Textarea from "@/components/common/Textarea";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const calculateAge = (dob) => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setValue("age", age);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "photo") {
          if (data.photo && data.photo.length > 0) {
            formData.append("photo", data.photo[0]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = await api.post("/members", formData);

      if (response.data.success) {
        toast.success(response.data.message);

        reset();

        setPreview(null);
      }
    } catch (err) {
      console.log(err);

      toast.error(err?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto px-5 py-8">
        <Card>
          <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
            Member Registration
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Section */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold border-b pb-2 mb-5">
                  Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    label={labels.memberName}
                    name="member_name"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Enter member name"
                  />

                  <Input
                    label={labels.fatherName}
                    name="father_name"
                    register={register}
                    errors={errors}
                    placeholder="Enter father or husband name"
                  />

                  <Input
                    label={labels.dob}
                    name="dob"
                    type="date"
                    register={register}
                    errors={errors}
                    required
                    onChange={(e) => calculateAge(e.target.value)}
                  />

                  <Input
                    label={labels.age}
                    name="age"
                    type="number"
                    register={register}
                    errors={errors}
                    readOnly
                  />

                  <RadioGroup
                    label={labels.gender}
                    name="gender"
                    register={register}
                    errors={errors}
                    options={genderOptions}
                    required
                  />

                  <Select
                    label={labels.bloodGroup}
                    name="blood_group"
                    register={register}
                    errors={errors}
                    options={bloodGroups}
                    required
                  />

                  <Input
                    label={labels.mobile}
                    name="mobile"
                    register={register}
                    errors={errors}
                    required
                    maxLength={10}
                    placeholder="10 digit mobile"
                  />

                  <Input
                    label={labels.whatsapp}
                    name="whatsapp"
                    register={register}
                    errors={errors}
                    maxLength={10}
                    placeholder="WhatsApp number"
                  />

                  <Input
                    label={labels.email}
                    name="email"
                    type="email"
                    register={register}
                    errors={errors}
                    placeholder="example@gmail.com"
                  />

                  <Input
                    label={labels.profession}
                    name="profession"
                    register={register}
                    errors={errors}
                    placeholder="Profession"
                  />

                  <Input
                    label={labels.wardNo}
                    name="ward_no"
                    register={register}
                    errors={errors}
                    placeholder="Ward Number"
                  />

                  <Input
                    label={labels.aadhaar}
                    name="aadhaar"
                    register={register}
                    errors={errors}
                    required
                    maxLength={12}
                    placeholder="12 digit Aadhaar"
                    validation={{
                      pattern: {
                        value: /^\d{12}$/,
                        message: "Aadhaar number must be exactly 12 digits",
                      },
                    }}
                  />
                </div>

                <div className="mt-6">
                  <Textarea
                    label={labels.address}
                    name="address"
                    register={register}
                    errors={errors}
                    rows={4}
                    required
                    placeholder="Door No, Street, Area, City..."
                  />
                </div>
              </div>
              {/* Right Section */}
              <div>
                <h3 className="text-lg font-semibold border-b pb-2 mb-5">
                  Photo Upload
                </h3>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="w-32 h-36 mx-auto rounded-lg border overflow-hidden relative">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                        Photo
                      </div>
                    )}
                  </div>

                  <label className="block mt-5 mb-2 font-medium">
                    Upload Photo
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    {...register("photo")}
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    className="w-full border rounded-lg p-2"
                  />

                  <p className="text-xs text-gray-500 mt-2">JPG, JPEG or PNG</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <div className="w-full md:w-64">
                <Button
                  type="submit"
                  text="Register Member"
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
