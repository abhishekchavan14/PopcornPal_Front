import React, { useState } from "react";
import { PiPopcorn, PiPopcornFill } from "react-icons/pi";
import Filter from "bad-words";
import { useNotification } from "../../hooks";

export default function AddRatingModal({ onSubmit }) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");
  const {updateNotification}  = useNotification()
  const ratingPopcornArray = new Array(10).fill("");
  const handleMouseEnter = (index) => {
    const ratingPopcornArray = new Array(index + 1).fill(index);
    setSelectedRatings([...ratingPopcornArray]);
  };

  const handleContentChange = ({ target }) => {
    setContent(target.value);
  };

  const handleSubmit = () => {
    const explicitRegex = /^(?:[a@][s\$][s\$]| [a@][s\$][s\$]h[o0][l1][e3][s\$]?|b[a@][s\$][t\+][a@]rd|b[e3][a@][s\$][t\+][i1][a@]?[l1]([i1][t\+]y)?|b[e3][a@][s\$][t\+][i1][l1][i1][t\+]y|b[e3][s\$][t\+][i1][a@][l1]([i1][t\+]y)?|b[i1][t\+]ch[s\$]?|b[i1][t\+]ch[e3]r[s\$]?|b[i1][t\+]ch[e3][s\$]|b[i1][t\+]ch[i1]ng?|b[l1][o0]wj[o0]b[s\$]?|c[l1][i1][t+]|^((c|k|ck|q)[o0](c|k|ck|q)[s\$]?)|((c|k|ck|q)[o0](c|k|ck|q)[s\$]u)|((c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[e3]d)|((c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[e3]r)|((c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[i1]ng)|((c|k|ck|q)[o0](c|k|ck|q)[s\$]u(c|k|ck|q)[s\$])|^cum[s\$]?|cumm??[e3]r|cumm?[i1]ngcock|((c|k|ck|q)um[s\$]h[o0][t\+])|((c|k|ck|q)un[i1][l1][i1]ngu[s\$])|((c|k|ck|q)un[i1][l1][l1][i1]ngu[s\$])|((c|k|ck|q)unn[i1][l1][i1]ngu[s\$])|((c|k|ck|q)un[t\+][s\$]?)|((c|k|ck|q)un[t\+][l1][i1](c|k|ck|q))|((c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[e3]r)|((c|k|ck|q)un[t\+][l1][i1](c|k|ck|q)[i1]ng)|cyb[e3]r(ph|f)u(c|k|ck|q)|d[a@]mn|d[i1]ck|d[i1][l1]d[o0]|d[i1][l1]d[o0][s\$]|d[i1]n(c|k|ck|q)|d[i1]n(c|k|ck|q)[s\$]|[e3]j[a@]cu[l1]|(ph|f)[a@]g[s\$]?|(ph|f)[a@]gg[i1]ng|(ph|f)[a@]gg?[o0][t\+][s\$]?|(ph|f)[a@]gg[s\$]|(ph|f)[e3][l1][l1]?[a@][t\+][i1][o0]|(ph|f)u(c|k|ck|q)|(ph|f)u(c|k|ck|q)[s\$]?|g[a@]ngb[a@]ng[s\$]?|g[a@]ngb[a@]ng[e3]d|g[a@]y|h[o0]m?m[o0]|h[o0]rny|j[a@](c|k|ck|q)\-?[o0](ph|f)(ph|f)?|j[e3]rk\-?[o0](ph|f)(ph|f)?|j[i1][s\$z][s\$z]?m?|[ck][o0]ndum[s\$]?|mast(e|ur)b(8|ait|ate)|n+[i1]+[gq]+[e3]*r+[s\$]*|[o0]rg[a@][s\$][i1]m[s\$]?|[o0]rg[a@][s\$]m[s\$]?|p[e3]nn?[i1][s\$]|p[i1][s\$][s\$]|p[i1][s\$][s\$][o0](ph|f)(ph|f) |p[o0]rn|p[o0]rn[o0][s\$]?|p[o0]rn[o0]gr[a@]phy|pr[i1]ck[s\$]?|pu[s\$][s\$][i1][e3][s\$]|pu[s\$][s\$]y[s\$]?|[s\$][e3]x|[s\$]h[i1][t\+][s\$]?|[s\$][l1]u[t\+][s\$]?|[s\$]mu[t\+][s\$]?|[s\$]punk[s\$]?|[t\+]w[a@][t\+][s\$]?$)/i;

    if (explicitRegex.test(content)) {
      // Display a message or take action if explicit content is found
      updateNotification("error","Your comment contains explicit content. Please revise.");
      return;
    }
    
    if (!selectedRatings.length) return;
    const filter = new Filter();
    const data = {
      rating: selectedRatings.length,
      content:filter.clean(content),
    };
    // console.log(data)
    onSubmit(data);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex p-2 my-10 relative">
        {ratingPopcornArray.map((_, index) => {
          return (
            <PiPopcorn
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              className="text-white cursor-pointer text-2xl md:text-4xl"
            />
          );
        })}
        <div className="flex absolute">
          {selectedRatings.map((_, index) => {
            return (
              <PiPopcornFill
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                className="text-golden cursor-pointer text-2xl md:text-4xl"
              />
            );
          })}
        </div>
      </div>

      <textarea
        value={content}
        onChange={handleContentChange}
        className="h-24 w-full p-2 border-2 border-dark-subtle outline-none resize-none text-white rounded-md indent-1 bg-transparent hover:border-primary-red transition duration-300"
        placeholder="What do you think about this movie?"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="border border-green text-white px-4 py-2 self-center hover:bg-green hover:text-black transition duration-300 cursor-pointer my-5"
      >
        Submit
      </button>
    </div>
  );
}
