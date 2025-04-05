interface Params {
    params: {
      id: string;
      
    };
  }

export default async function  UserProfile ({params}:any) {
    return (
        <div>
            <h1 className="flex flex-col">Profile</h1>
            <span className="text-xl text-white ml-2">UserProfile  Content  {params.id}</span>
        </div>
    );
}