export default function CategoryGridItem( { categoryArray , handleSelect}) {
  return (
    <div className="grid-item" key={categoryArray.id} onClick={() => handleSelect(categoryArray.id)}>{categoryArray.icon} {categoryArray.name}</div>
  );
}