import { useState } from "react";
import { useGetLinkStats } from "@/lib/react-query";
import { Loading, DateModal } from "@/components";
import { Helmet } from 'react-helmet-async';

export const Stats = () => {
  const [openDateModal, setOpenDateModal] = useState(false);
  const [link, setLink] = useState(null);
  const { data: links, isPending: isLoading } = useGetLinkStats();

  const openDetails = link => {
    setOpenDateModal(true);
    setLink(link);
  };

  if (isLoading) {
    return <p className="mt-4">
      <Loading />
    </p>
    
  }

  return (
    <section className="my-6">
      <Helmet>
        <title>Link Stats</title>
      </Helmet>
      
      <h1 className="heading3 mb-4">Stats</h1>
      <div class="relative rounded overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50/50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Link
              </th>
              <th scope="col" class="px-6 py-3">
                Clicks
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {links?.data?.data?.map(link => (
              <tr key={link._id} class="bg-white border-b dark:bg-dark-secondary dark:border-gray-700">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {link.title}
                </td>
                <td class="px-6 py-4 text-center">{link.clickCount || "0"}</td>
                <td class="px-6 py-4">
                  <button onClick={() => openDetails(link)} type="button">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DateModal openDateModal={openDateModal} setOpenDateModal={setOpenDateModal} link={link} />
    </section>
  );
};
