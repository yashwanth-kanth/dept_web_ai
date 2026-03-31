import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getFaculty = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("faculty").collect();
  },
});

export const seedFaculty = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("faculty").collect();
    if (existing.length > 0) return "Already seeded";

    const members = [
      // Faculty
      { name: "Dr.M.Kaliappan", designation: "Professor and Head", qualification: "B.E., M.E., Ph.D.,(Post Doc- Federal University of Ceara, Brazil)", email: "kaliappan@ritrjpm.ac.in", type: "faculty" },
      { name: "Dr. E.Mariappan", designation: "Associate Professor-III", qualification: "B.E., M.E., Ph.D.", email: "mariappan@ritrjpm.ac.in", type: "faculty" },
      { name: "Dr. S.V.Anandhi", designation: "Associate Professor-II", qualification: "B.E.,M.E.,Ph.D.", email: "anandhi@ritrjpm.ac.in", type: "faculty" },
      { name: "Dr.S.Selva Birundha", designation: "Associate Professor-I", qualification: "B.E., M.Tech., Ph.D.", email: "selvabirunda@ritrjpm.ac.in", type: "faculty" },
      { name: "Dr.R.M.Rajeswari", designation: "Assistant Professor-III", qualification: "B.E., M.Tech., Ph.D.", email: "rajeswarirm@ritrjpm.ac.in", type: "faculty" },
      { name: "Mr. M. Ramnath", designation: "Assistant Professor-III", qualification: "B.Tech.,M.E., Pursuing Ph.D.", email: "ramnath@ritrjpm.ac.in", type: "faculty" },
      { name: "Mrs. R. Angel Hephzibah", designation: "Assistant Professor-II", qualification: "B.E., M.E., Pursuing Ph.D", email: "angel@ritrjpm.ac.in", type: "faculty" },
      { name: "Mrs.B.Revathi", designation: "Assistant Professor-II", qualification: "B.E., M.E., Pursuing Ph.D.", email: "revathib@ritrjpm.ac.in", type: "faculty" },
      { name: "Dr.C.Karpagavalli", designation: "Assistant Professor-II", qualification: "B.E., M.E.,Pursuing Ph.D", email: "karpagavalli@ritrjpm.ac.in", type: "faculty" },
      { name: "Mrs.C.Usharani", designation: "Assistant Professor Grade - II", qualification: "B.Tech.,M.E., Pursuing Ph.D", email: "usharanic@ritrjpm.ac.in", type: "faculty" },
      { name: "Mrs.B.SankaraLakshmi", designation: "Assistant Professor-I", qualification: "B.E., M.Tech.", email: "sankaralakshmi@ritrjpm.ac.in", type: "faculty" },
      { name: "Dr.R.Ramana", designation: "Assistant Professor-I", qualification: "B.Tech., M.Tech., Ph.D.", email: "ramana@ritrjpm.ac.in", type: "faculty" },
      { name: "Mrs.S.Pradeepha", designation: "Assistant Professor-I", qualification: "B.Tech., M.E.", email: "pradeepha@ritrjpm.ac.in", type: "faculty" },
      { name: "Mrs.M.Santhikala", designation: "Assistant Professor-I", qualification: "B.E., M.E., pursuing Ph.D.", email: "santhikala@ritrjpm.ac.in", type: "faculty" },
      { name: "Mr.P.Vetrivel", designation: "Assistant Professor-I", qualification: "B.E., M.E.", email: "vetrivel@ritrjpm.ac.in", type: "faculty" },
      { name: "Ms.V.Logapriya", designation: "Assistant Professor-I", qualification: "B.E., M.E.", email: "logapriya@ritrjpm.ac.in", type: "faculty" },
      { name: "Mr. R. Muthu Eshwaran", designation: "Assistant Professor-I", qualification: "B.E., M.E.", email: "muthueshwaran@ritrjpm.ac.in", type: "faculty" },
      { name: "Ms.K.Dhanalakshmi", designation: "Assistant Professor-I", qualification: "B.E.,M.E.", email: "dhanalakshmi@ritrjpm.ac.in", type: "faculty" },
      { name: "Ms.B.Anitha", designation: "Assistant Professor - I", qualification: "B.E.,M.E.,", email: "anitha@ritrjpm.ac.in", type: "faculty" },
      
      // Support Staff
      { name: "Mr.M.Chandrasekar", designation: "Lab Technician", qualification: "B.Sc ( Computer Science), MCA", email: "m.chandrasekar@ritrjpm.ac.in", type: "support" },
      { name: "Mr. R.RUBAN ARUL RAJ", designation: "Lab Technician", qualification: "B.Sc (CS), M.Sc (CS)", email: "ruban@ritrjpm.ac.in", type: "support" },
      { name: "Mrs.T.Ramalakshmi", designation: "Junior Assistant", qualification: "B.Com", email: "adja@ritrjpm.ac.in", type: "support" }
    ];

    for (const member of members) {
      await ctx.db.insert("faculty", member as any);
    }
    return "Seeded successfully";
  },
});
