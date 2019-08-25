#Create brain NodeJS 

<========== GIT SYNTAX ==========>
1. Confirm infomation:
	$git config --global user.name "username"
	$git config -- global user.mail "username@gmail.com"

2. Create git storage:
	$git init

3. Clone git:
	$git clone "url clone"

4. Branch in git:
	- Create new branch:
		$git branch
	- Transform and create new branch:
		$git branch -<name_branch>

5. Transform branch:
	$git checkout <name_branch>

6. Modified and add to commit:
	- Add all files:
		$git add .

	- Commit to modified:
		$git commit -m "Note message"

7. Push to server github:
	$git push origin <name_branch>
	(Example: git push origin master)

	If no exists, must add new remote before push:
	$git remote add origin <remote_url>
	$git push origin <name_branch>

8. Merge branch:
	$git checkout master
	$git merge <new_branch>

9. Show log:
	$git log

10. Show diff before push:
	$git diff

11. Merge commit:
	$git rebase -i HEAD~

12. Pull from remote repository:
	$git pull origin master
<========================================>
