drop TABLE Product
create TABLE Product
(
	[Id] INT NOT NULL PRIMARY KEY identity(1,1),
	[KeyWord] varchar(50),
	[Name] nvarchar(500),
	[Img] varchar(500),
	[Describe] nvarchar(500),
	[Active] bit,
	[CreateBy] varchar(50),
	[CreateDate] datetime, 
	[UpdateBy] varchar(50),
	[UpdateDate] datetime
)
